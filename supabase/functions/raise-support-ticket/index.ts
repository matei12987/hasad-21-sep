const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { contact_id, issue, contact_method, user_id } = await req.json();
    
    if (!contact_id || !issue || !user_id) {
      return new Response(
        JSON.stringify({ error: 'MISSING_PARAMS', message: 'contact_id, issue, and user_id are required' }), 
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          }
        }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!supabaseUrl || !supabaseKey) {
      return new Response(
        JSON.stringify({ error: 'SUPABASE_CONFIG_MISSING' }), 
        { 
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          }
        }
      );
    }

    const { createClient } = await import('npm:@supabase/supabase-js@2.57.2');
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Update the contact to mark ticket as raised
    const { error: updateError } = await supabase
      .from('contacts')
      .update({ 
        ticket_raised: true,
        updated_at: new Date().toISOString()
      })
      .eq('contact_id', contact_id)
      .eq('user_id', user_id); // Ensure user can only update their own contacts

    if (updateError) {
      console.error('Database update error:', updateError);
      return new Response(
        JSON.stringify({ error: 'DATABASE_ERROR', message: updateError.message }), 
        { 
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          }
        }
      );
    }

    // Log the support ticket (in production, you might want to store this in a separate tickets table)
    console.log('Support ticket raised:', {
      contact_id,
      user_id,
      issue: issue.substring(0, 100) + '...', // Log first 100 chars for privacy
      contact_method,
      timestamp: new Date().toISOString()
    });

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Support ticket raised successfully',
        ticket_id: `TICKET-${Date.now()}-${contact_id}`
      }), 
      { 
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        }
      }
    );
  } catch (err) {
    console.error('Edge function error:', err);
    return new Response(
      JSON.stringify({ error: 'INTERNAL_ERROR', message: err.message }), 
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        }
      }
    );
  }
});