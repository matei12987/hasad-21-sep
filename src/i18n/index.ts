import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation resources
const resources = {
  en: {
    translation: {
      // Authentication
      login: 'Login',
      signup: 'Sign Up',
      logout: 'Logout',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      rememberMe: 'Remember Me',
      forgotPassword: 'Forgot Password?',
      createAccount: 'Create Account',
      signInAccount: 'Sign In to Your Account',
      alreadyHaveAccount: 'Already have an account?',
      dontHaveAccount: "Don't have an account?",
      welcomeBack: 'Welcome back',
      loading: 'Loading...',
      passwordsDoNotMatch: 'Passwords do not match',

      // Navigation
      home: 'Home',
      profile: 'Profile',
      settings: 'Settings',
      dashboard: 'Dashboard',
      contacts: 'Contacts',
      shopping: 'Shopping',
      plans: 'Plans',
      cart: 'Cart',
      messages: 'Messages',

      // Common actions
      save: 'Save',
      cancel: 'Cancel',
      edit: 'Edit',
      delete: 'Delete',
      add: 'Add',
      remove: 'Remove',
      search: 'Search',
      filter: 'Filter',
      view: 'View',
      close: 'Close',
      back: 'Back',

      // Contact management
      manageContacts: 'Manage your contacts efficiently',
      addContact: 'Add Contact',
      editContact: 'Edit Contact',
      deleteConfirm: 'Are you sure you want to delete this contact?',
      noContacts: 'No contacts found',
      personalInfo: 'Personal Information',
      contactInfo: 'Contact Information',
      name: 'Name',
      type: 'Type',
      mobile: 'Mobile',
      telephone: 'Telephone',
      address: 'Address',
      city: 'City',
      country: 'Country',
      postcode: 'Postcode',
      nationality: 'Nationality',
      uploadId: 'Upload ID Document',
      chooseFile: 'Choose File',

      // Contact types
      consumer: 'Consumer',
      institutional: 'Institutional',
      corporate: 'Corporate',

      // Product names for activity details
      freshLettuce: 'Fresh Lettuce',
      organicTomatoes: 'Organic Tomatoes',
      sweetCorn: 'Sweet Corn',
      freshApples: 'Fresh Apples',
      organicCarrots: 'Organic Carrots',
      cherryTomatoes: 'Cherry Tomatoes',
      freshBasil: 'Fresh Basil',

      // Profile
      manageYourAccount: 'Manage your account and preferences',
      editProfile: 'Edit Profile',
      saveChanges: 'Save Changes',
      analytics: 'Analytics',
      viewYourPerformance: 'View your performance',
      paymentMethods: 'Payment Methods',
      manageYourCards: 'Manage your payment cards',
      addresses: 'Addresses',
      deliveryAddresses: 'Manage delivery addresses',
      notificationSettings: 'Notification Settings',
      managePreferences: 'Manage your preferences',
      helpAndSupport: 'Help & Support',
      getAssistance: 'Get assistance when you need it',
      appPreferences: 'App Preferences',
      accountInfo: 'Account Information',
      emailAddress: 'Email Address',
      accountType: 'Account Type',
      preferredCurrency: 'Preferred Currency',
      saudiRiyal: 'Saudi Riyal (SAR)',
      joinDate: 'Join Date',
      emailNotifications: 'Email Notifications',
      receiveUpdatesViaEmail: 'Receive updates via email',
      pushNotifications: 'Push Notifications',
      receivePushNotifications: 'Receive push notifications',
      smsNotifications: 'SMS Notifications',
      receiveSmsNotifications: 'Receive SMS notifications',
      appStatus: 'App Status',
      consumer: 'Consumer',
      farmer: 'Farmer',
      enabled: 'Enabled',
      disabled: 'Disabled',
      january: 'January',
      february: 'February',
      march: 'March',
      april: 'April',
      may: 'May',
      june: 'June',
      july: 'July',
      august: 'August',
      september: 'September',
      october: 'October',
      november: 'November',
      december: 'December',
      termsAndPrivacy: 'Terms & Privacy',
      legalInformation: 'Legal information and policies',
      productsListed: 'Products Listed',
      ordersCompleted: 'Orders Completed',
      totalEarnings: 'Total Earnings',
      smartFarmingFingerTips: 'Smart farming at your fingertips',
      rating: 'Rating',
      farmLocation: 'Farm Location',

      // Settings
      selectLanguage: 'Select Language',
      darkMode: 'Dark Mode',
      notifications: 'Notifications',
      helpAndSupport: 'Help & Support',

      // Marketplace
      hasadMarketplace: 'HASAD Marketplace',
      marketplace: 'Marketplace',
      searchProducts: 'Search products and farms...',
      searchProductsFarms: 'Search products and farms...',
      allProducts: 'All Products',
      allCategories: 'All Categories',
      leafyGreens: 'Leafy Greens',
      vegetables: 'Vegetables',
      herbs: 'Herbs',
      fruits: 'Fruits',
      grains: 'Grains',
      crops: 'Crops',
      newest: 'Newest',
      newestFirst: 'Newest First',
      priceLowToHigh: 'Price: Low to High',
      priceHighToLow: 'Price: High to Low',
      priceAscending: 'Price: Low to High',
      priceDescending: 'Price: High to Low',
      highestRated: 'Highest Rated',
      ratingHighest: 'Highest Rated',
      filters: 'Filters',
      advancedFilters: 'Advanced Filters',
      priceRange: 'Price Range',
      min: 'Min',
      max: 'Max',
      farmingMethod: 'Farming Method',
      hydroponic: 'Hydroponic',
      organic: 'Organic',
      conventional: 'Conventional',
      certifications: 'Certifications',
      fairTrade: 'Fair Trade',
      location: 'Location',
      allLocations: 'All Locations',
      riyadh: 'Riyadh',
      jeddah: 'Jeddah',
      dammam: 'Dammam',
      mecca: 'Mecca',
      availability: 'Availability',
      inStockOnly: 'In Stock Only',
      sameDayDelivery: 'Same Day Delivery',
      clearFilters: 'Clear Filters',
      applyFilters: 'Apply Filters',
      noProductsFound: 'No products found',
      adjustSearchCriteria: 'Try adjusting your search or filter criteria',
      adjustSearchOrFilter: 'Try adjusting your search or filter criteria',
      addToCart: 'Add to Cart',
      outOfStock: 'Out of Stock',
      inStock: 'In Stock',
      lowStock: 'Low Stock',
      available: 'Available',
      daysFresh: 'days fresh',
      reviews: 'reviews',
      harvested: 'Harvested',
      minOrder: 'Min order',
      
      // Product descriptions
      crispTenderLettuce: 'Crisp, tender butterhead lettuce grown hydroponically in controlled environment. Perfect for salads and sandwiches.',
      sweetJuicyTomatoes: 'Sweet, juicy cherry tomatoes grown using organic methods. Bursting with flavor and perfect for snacking.',
      aromaticBasilLeaves: 'Aromatic fresh basil leaves, perfect for cooking and garnishing. Grown in optimal conditions for maximum flavor.',
      sweetJuicyStrawberries: 'Sweet, juicy strawberries grown in climate-controlled greenhouses. Perfect size and incredible taste.',
      
      // Farm names
      greenValleyHydroponics: 'Green Valley Hydroponics',
      sunnyOrganicFarm: 'Sunny Organic Farm',
      berryFreshFarms: 'Berry Fresh Farms',
      
      // Certifications
      haccp: 'HACCP',
      fairTrade: 'Fair Trade',
      globalGap: 'GlobalGAP',

      // Shopping Cart
      shoppingCart: 'Shopping Cart',
      cartEmpty: 'Your cart is empty',
      startShopping: 'Start shopping to add items to your cart',
      continueShopping: 'Continue Shopping',
      clearCart: 'Clear Cart',
      cartSummary: 'Cart Summary',
      subtotal: 'Subtotal',
      deliveryFee: 'Delivery Fee',
      tax: 'Tax',
      total: 'Total',
      checkout: 'Checkout',
      freeDeliveryOver: 'Free delivery over',
      estimatedDelivery: 'Estimated delivery',
      tomorrowTwoPm: 'Tomorrow at 2 PM',
      per: 'per',
      kg: 'kg',
      piece: 'piece',
      bunch: 'bunch',
      box: 'box',

      // Home screen
      goodMorning: 'Good morning',
      manageFarmEfficiently: 'Manage your farm efficiently',
      discoverFreshProduce: 'Discover fresh, local produce',
      quickActions: 'Quick Actions',
      todaysWeather: "Today's Weather",
      partlyCloudy: 'Partly Cloudy',
      humidity: 'Humidity',
      uvIndex: 'UV Index',
      farmOverview: 'Farm Overview',
      activeCrops: 'Active Crops',
      pendingOrders: 'Pending Orders',
      thisMonth: 'This Month',
      featuredProducts: 'Featured Products',
      freshLettuce: 'Fresh Lettuce',
      organicTomatoes: 'Organic Tomatoes',
      sweetCorn: 'Sweet Corn',
      freshApples: 'Fresh Apples',
      organicCarrots: 'Organic Carrots',
      cherryTomatoes: 'Cherry Tomatoes',
      freshBasil: 'Fresh Basil',
      greenValleyFarm: 'Green Valley Farm',
      sunnyOrganicFarm: 'Sunny Organic Farm',
      harvestHills: 'Harvest Hills',
      recentActivity: 'Recent Activity',

      // Activity types
      orderCompleted: 'Order {{orderId}} completed',
      newOrderReceived: 'New order received',
      lettuceHarvestReady: 'Lettuce harvest ready',
      orderDelivered: 'Order delivered',
      orderShipped: 'Order shipped',
      paymentProcessed: 'Payment processed',
      hoursAgo: '{{count}} hour ago',
      hoursAgo_other: '{{count}} hours ago',
      dayAgo: '1 day ago',
      daysAgo: '{{count}} day ago',
      daysAgo_other: '{{count}} days ago',
      hourAgo: '1 hour ago',

      // Subscription Plans
      subscriptionPlans: 'Subscription Plans',
      freshProduceDelivered: 'Fresh produce delivered to your door',
      myActiveSubscriptions: 'My Active Subscriptions',
      availableSubscriptionPlans: 'Available Subscription Plans',
      weeklyFreshBox: 'Weekly Fresh Box',
      freshSeasonalVegetables: 'Fresh seasonal vegetables and herbs',
      myRooftopGarden: 'My Rooftop Garden',
      sponsorYourOwnSection: 'Sponsor your own growing section',
      nextDelivery: 'Next Delivery',
      includedProducts: 'Included Products',
      modify: 'Modify',
      pause: 'Pause',
      resume: 'Resume',
      schedule: 'Schedule',
      subscribeTo: 'Subscribe to',
      subscriptionDuration: 'Subscription Duration',
      preferredDeliveryDay: 'Preferred Delivery Day',
      deliveryTimeSlot: 'Delivery Time Slot',
      deliveryAddress: 'Delivery Address',
      specialInstructions: 'Special Instructions',
      optional: 'Optional',
      specialInstructionsPlaceholder: 'Any special delivery instructions...',
      planPrice: 'Plan Price',
      frequency: 'Frequency',
      totalPerDelivery: 'Total per Delivery',
      subscribeNow: 'Subscribe Now',
      enterCompleteAddress: 'Enter your complete delivery address...',

      // Subscription Plan Details
      starterFreshBox: 'Starter Fresh Box',
      perfectForSmallFamilies: 'Perfect for small families and individuals',
      familyFreshBox: 'Family Fresh Box',
      idealForFamilies: 'Ideal for families of 3-5 people',
      adoptARooftop: 'Adopt a Rooftop',
      seasonalSpecialtyBox: 'Seasonal Specialty Box',
      curatedSelectionSeasonal: 'Curated selection of seasonal specialties',
      mostPopular: 'Most Popular',
      everyWeek: 'Every Week',
      everyTwoWeeks: 'Every Two Weeks',
      everyMonth: 'Every Month',
      months: 'months',
      weeks: 'weeks',
      durationOptions: 'Duration Options',

      // Plan Features
      freshSeasonalVegetables: 'Fresh seasonal vegetables',
      recipeCardsIncluded: 'Recipe cards included',
      flexibleDeliverySchedule: 'Flexible delivery schedule',
      cancelAnytime: 'Cancel anytime',
      premiumSeasonalVegetablesFruits: 'Premium seasonal vegetables & fruits',
      recipeCardsCookingTips: 'Recipe cards & cooking tips',
      priorityDeliverySlots: 'Priority delivery slots',
      substitutionPreferences: 'Substitution preferences',
      yourOwnDedicatedGrowingSpace: 'Your own dedicated growing space',
      monthlyHarvestDelivery: 'Monthly harvest delivery',
      farmVisitAccess: 'Farm visit access',
      growthProgressUpdates: 'Growth progress updates',
      personalizedCropSelection: 'Personalized crop selection',
      rareSpecialtyVarieties: 'Rare & specialty varieties',
      seasonalPeakFreshness: 'Seasonal peak freshness',
      educationalContent: 'Educational content',
      chefCollaborationRecipes: 'Chef collaboration recipes',
      premiumPackaging: 'Premium packaging',

      // Days of week
      monday: 'Monday',
      tuesday: 'Tuesday',
      wednesday: 'Wednesday',
      thursday: 'Thursday',
      friday: 'Friday',
      saturday: 'Saturday',
      sunday: 'Sunday',

      // Time periods
      morning: 'Morning',
      afternoon: 'Afternoon',
      evening: 'Evening',

      // Status
      active: 'Active',
      inactive: 'Inactive',
      paused: 'Paused',
      cancelled: 'Cancelled',
      expired: 'Expired',
      pending: 'Pending',
      suspended: 'Suspended',
      delivered: 'Delivered',
      shipped: 'Shipped',
      processing: 'Processing',
      confirmed: 'Confirmed',
      preparing: 'Preparing',
      ready: 'Ready',
      out_for_delivery: 'Out for Delivery',
      placed: 'Placed',

      // Admin Dashboard
      hasadAdminPanel: 'HASAD Admin Panel',
      adminPortal: 'Admin Portal',
      readOnly: 'Read Only',
      monitoringOnly: 'Monitoring Only',
      adminReadOnlyNotice: 'This is a read-only admin panel for monitoring purposes only',
      adminUser: 'Admin User',
      systemAdministrator: 'System Administrator',
      farmers: 'Farmers',
      consumers: 'Consumers',
      orders: 'Orders',
      alerts: 'Alerts',
      totalFarmers: 'Total Farmers',
      totalConsumers: 'Total Consumers',
      activeDevices: 'Active Devices',
      openAlerts: 'Open Alerts',
      monthlyRevenue: 'Monthly Revenue',
      systemUptime: 'System Uptime',
      dataProcessed: 'Data Processed',
      avgResponseTime: 'Avg Response Time',
      searchFarmers: 'Search farmers...',
      searchConsumers: 'Search consumers...',
      allStatuses: 'All Statuses',
      allLocations: 'All Locations',
      allTiers: 'All Tiers',
      allSeverities: 'All Severities',
      allTypes: 'All Types',
      farmSites: 'Farm Sites',
      revenue: 'Revenue',
      devices: 'Devices',
      actions: 'Actions',
      subscription: 'Subscription',
      totalOrders: 'Total Orders',
      userDetails: 'User Details',
      alertDetails: 'Alert Details',
      totalAmount: 'Total Amount:',
      quantity: 'Quantity:',
      accountInformation: 'Account Information',
      contactInformation: 'Contact Information',
      farmInformation: 'Farm Information',
      deviceStatus: 'Device Status',
      subscriptionDetails: 'Subscription Details',
      recentActivity: 'Recent Activity',
      readOnlyView: 'Read-Only View',
      readOnlyViewDescription: 'This is a monitoring view only. No changes can be made.',
      readOnlyAlertDescription: 'Alert details are shown for monitoring purposes only.',
      joinDate: 'Join Date',
      lastActive: 'Last Active',
      role: 'Role',
      phone: 'Phone',
      farmName: 'Farm Name',
      farmType: 'Farm Type',
      tier: 'Tier',
      status: 'Status',
      expiryDate: 'Expiry Date',
      online: 'Online',
      offline: 'Offline',
      maintenance: 'Maintenance',
      lastUpdate: 'Last Update',
      verified: 'Verified',
      ordersCount: 'orders',
      sites: 'sites',
      showing: 'Showing',
      to: 'to',
      of: 'of',
      entries: 'entries',
      page: 'Page',
      previous: 'Previous',
      next: 'Next',
      noFarmersFound: 'No farmers found',
      noConsumersFound: 'No consumers found',
      adjustSearchCriteria: 'Try adjusting your search criteria',
      alertId: 'Alert ID',
      created: 'Created',
      acknowledged: 'Acknowledged',
      additionalInformation: 'Additional Information',
      statusInformation: 'Status Information',
      resolved: 'Resolved',
      yes: 'Yes',
      no: 'No',
      noAlertsFound: 'No alerts found',
      critical: 'Critical',
      warning: 'Warning',
      info: 'Info',
      deviceFaults: 'Device Faults',
      thresholdAlerts: 'Threshold Alerts',
      maintenanceDue: 'Maintenance Due',
      connectivityIssues: 'Connectivity Issues',
      harvestReady: 'Harvest Ready',
      systemUpdates: 'System Updates',

      // Tiers
      basic: 'Basic',
      premium: 'Premium',
      enterprise: 'Enterprise',
      trial: 'Trial',

      // Currencies
      usDollar: 'US Dollar',
      euro: 'Euro',
      britishPound: 'British Pound',
      uaeDirham: 'UAE Dirham',
      kuwaitiDinar: 'Kuwaiti Dinar',
      qatariRiyal: 'Qatari Riyal',
      bahrainiDinar: 'Bahraini Dinar',
      omaniRial: 'Omani Rial',
      jordanianDinar: 'Jordanian Dinar',

      // Farm types
      greenhouse: 'Greenhouse',
      rooftop: 'Rooftop',
      indoor: 'Indoor',
      outdoor: 'Outdoor',

      // IoT and Farm Management
      iotControls: 'IoT Controls',
      deviceManagement: 'Device management',
      cropManagement: 'Crop Management',
      trackGrowth: 'Track growth progress',
      tasks: 'Tasks',
      maintenanceSchedule: 'Maintenance schedule',
      performanceReports: 'Performance reports',
      sellProducts: 'Sell your products',
      realTimeMonitoring: 'Real-time monitoring',
      freshProduce: 'Fresh produce',
      deliveryPlans: 'Delivery plans',
      yourItems: 'Your items',
      orderHistory: 'Order history',
      chatWithFarmers: 'Chat with farmers',
      yourInsights: 'Your insights',

      // Settings specific
      connected: 'Connected',
      serviceRunningNormally: 'Service running normally',
      twoMinutesAgo: 'Two minutes ago',
      importantNote: 'Important Note',
      dataProtectionNotice: 'All your data is protected and encrypted. Preferences are saved locally on your device to ensure privacy and security.',
      appVersion: 'HASAD v1.0.0',

      // Crop Management specific
      addCrop: 'Add Crop',
      readyToHarvest: 'Ready to Harvest',
      expectedYield: 'Expected Yield',
      avgHealthScore: 'Avg Health Score',
      growthProgress: 'Growth Progress',
      healthScore: 'Health Score',
      planted: 'Planted',
      harvest: 'Harvest',
      quantity: 'Quantity',
      plants: 'plants',
      logGrowth: 'Log Growth',
      addNewCrop: 'Add New Crop',
      cropName: 'Crop Name',
      cropNamePlaceholder: 'e.g., Butterhead Lettuce',
      variety: 'Variety',
      varietyPlaceholder: 'e.g., Boston Bibb',
      category: 'Category',
      plantedDate: 'Planted Date',
      expectedHarvest: 'Expected Harvest',
      quantityPlanted: 'Quantity Planted',
      quantityPlaceholder: '200',
      expectedYieldKg: 'Expected Yield (kg)',
      yieldPlaceholder: '50',
      notes: 'Notes',
      cropNotesPlaceholder: 'Any additional notes about this crop...',
      growthLog: 'Growth Log',
      growthStagePercent: 'Growth Stage (%)',
      growthStagePlaceholder: '95',
      heightCm: 'Height (cm)',
      heightPlaceholder: '15',
      healthScoreRange: 'Health Score (0-100)',
      healthScorePlaceholder: '92',
      actionsTaken: 'Actions Taken',
      watering: 'Watering',
      nutrientAdjustment: 'Nutrient adjustment',
      pruning: 'Pruning',
      phMonitoring: 'pH monitoring',
      pestControl: 'Pest control',
      observationsPlaceholder: 'Observations, changes, recommendations...',
      photos: 'Photos',
      clickToAddPhotos: 'Click to add photos',
      saveLog: 'Save Log',

      // Farm Dashboard specific
      farmDashboard: 'Farm Dashboard',
      activeAlerts: 'Active Alerts',
      acknowledge: 'Acknowledge',
      realTimeMonitoring: 'Real-time Monitoring',
      temperature: 'Temperature',
      humidity: 'Humidity',
      phLevel: 'pH Level',
      waterLevel: 'Water Level',
      flow: 'Flow',
      solarGeneration: 'Solar Generation',
      consumption: 'Consumption',
      systemStatus: 'System Status',
      uptime: 'Uptime',
      nutrients: 'Nutrients',
      environment: 'Environment',
      light: 'Light',
      performanceMetrics: 'Performance Metrics',
      thisWeek: 'This Week',
      waterPerKg: 'Water per kg',
      energyPerKg: 'Energy per kg',
      carbonOffset: 'CO₂ Offset',
      milesSaved: 'Miles Saved',
      vsLastWeek: 'vs last week',
      tasksAndMaintenance: 'Tasks & Maintenance',
      reports: 'Reports',
      squareMeters: 'm²',

      // Alert translations
      highTemperature: 'High Temperature',
      temperatureHasExceeded26CFor2Hours: 'Temperature has exceeded 26°C for 2 hours',
      filterReplacementDue: 'Filter Replacement Due',
      waterFilterNeedsReplacementIn3Days: 'Water filter needs replacement in 3 days',
    }
  },
  ar: {
    translation: {
      // Authentication
      login: 'تسجيل الدخول',
      signup: 'إنشاء حساب',
      logout: 'تسجيل الخروج',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      confirmPassword: 'تأكيد كلمة المرور',
      rememberMe: 'تذكرني',
      forgotPassword: 'نسيت كلمة المرور؟',
      createAccount: 'إنشاء حساب',
      signInAccount: 'تسجيل الدخول إلى حسابك',
      alreadyHaveAccount: 'لديك حساب بالفعل؟',
      dontHaveAccount: 'ليس لديك حساب؟',
      welcomeBack: 'مرحباً بعودتك',
      loading: 'جاري التحميل...',
      passwordsDoNotMatch: 'كلمات المرور غير متطابقة',

      // Navigation
      home: 'الرئيسية',
      profile: 'الملف الشخصي',
      settings: 'الإعدادات',
      dashboard: 'لوحة التحكم',
      contacts: 'جهات الاتصال',
      shopping: 'التسوق',
      plans: 'الخطط',
      cart: 'السلة',
      messages: 'الرسائل',

      // Common actions
      save: 'حفظ',
      cancel: 'إلغاء',
      edit: 'تعديل',
      delete: 'حذف',
      add: 'إضافة',
      remove: 'إزالة',
      search: 'بحث',
      filter: 'تصفية',
      view: 'عرض',
      close: 'إغلاق',
      back: 'رجوع',

      // Contact management
      manageContacts: 'إدارة جهات الاتصال بكفاءة',
      addContact: 'إضافة جهة اتصال',
      editContact: 'تعديل جهة الاتصال',
      deleteConfirm: 'هل أنت متأكد من حذف جهة الاتصال هذه؟',
      noContacts: 'لا توجد جهات اتصال',
      personalInfo: 'المعلومات الشخصية',
      contactInfo: 'معلومات الاتصال',
      name: 'الاسم',
      type: 'النوع',
      mobile: 'الجوال',
      telephone: 'الهاتف',
      address: 'العنوان',
      city: 'المدينة',
      country: 'البلد',
      postcode: 'الرمز البريدي',
      nationality: 'الجنسية',
      uploadId: 'رفع وثيقة الهوية',
      chooseFile: 'اختيار ملف',

      // Contact types
      consumer: 'مستهلك',
      institutional: 'مؤسسي',
      corporate: 'شركات',

      // Product names for activity details
      freshLettuce: 'خس طازج',
      organicTomatoes: 'طماطم عضوية',
      sweetCorn: 'ذرة حلوة',
      freshApples: 'تفاح طازج',
      organicCarrots: 'جزر عضوي',
      cherryTomatoes: 'طماطم كرزية',
      freshBasil: 'ريحان طازج',

      // Product catalog specific names
      freshButterheedLettuce: 'خس بوسطن طازج',
      organicCherryTomatoes: 'طماطم كرزية عضوية',
      premiumStrawberries: 'فراولة مميزة',

      // Profile
      manageYourAccount: 'إدارة حسابك وتفضيلاتك',
      editProfile: 'تعديل الملف الشخصي',
      saveChanges: 'حفظ التغييرات',
      analytics: 'التحليلات',
      viewYourPerformance: 'عرض أداءك',
      paymentMethods: 'طرق الدفع',
      manageYourCards: 'إدارة بطاقاتك',
      addresses: 'العناوين',
      deliveryAddresses: 'إدارة عناوين التوصيل',
      notificationSettings: 'إعدادات الإشعارات',
      managePreferences: 'إدارة تفضيلاتك',
      helpAndSupport: 'المساعدة والدعم',
      getAssistance: 'احصل على المساعدة عند الحاجة',
      appPreferences: 'تفضيلات التطبيق',
      accountInfo: 'معلومات الحساب',
      emailAddress: 'البريد الإلكتروني',
      accountType: 'نوع الحساب',
      preferredCurrency: 'العملة المفضلة',
      saudiRiyal: 'الريال السعودي (ر.س)',
      joinDate: 'تاريخ الانضمام',
      emailNotifications: 'إشعارات البريد الإلكتروني',
      receiveUpdatesViaEmail: 'تلقي التحديثات عبر البريد الإلكتروني',
      pushNotifications: 'الإشعارات الفورية',
      receivePushNotifications: 'تلقي الإشعارات الفورية',
      smsNotifications: 'إشعارات الرسائل النصية',
      receiveSmsNotifications: 'تلقي إشعارات الرسائل النصية',
      appStatus: 'حالة التطبيق',
      consumer: 'مستهلك',
      farmer: 'مزارع',
      enabled: 'مفعل',
      disabled: 'معطل',
      january: 'يناير',
      february: 'فبراير',
      march: 'مارس',
      april: 'أبريل',
      may: 'مايو',
      june: 'يونيو',
      july: 'يوليو',
      august: 'أغسطس',
      september: 'سبتمبر',
      october: 'أكتوبر',
      november: 'نوفمبر',
      december: 'ديسمبر',
      selectCurrency: 'اختر العملة',
      About: 'حول حصاد',
      termsAndPrivacy: 'الشروط والخصوصية',
      legalInformation: 'المعلومات القانونية والسياسات',
      productsListed: 'المنتجات المدرجة',
      ordersCompleted: 'الطلبات المكتملة',
      totalEarnings: 'إجمالي الأرباح',
      smartFarmingFingerTips: 'الزراعة الذكية في متناول يدك',
      rating: 'التقييم',
      farmLocation: 'موقع المزرعة',

      // Settings
      selectLanguage: 'اختيار اللغة',
      darkMode: 'الوضع المظلم',
      notifications: 'الإشعارات',
      helpAndSupport: 'المساعدة والدعم',

      // Marketplace
      hasadMarketplace: 'سوق حصاد',
      marketplace: 'السوق',
      searchProducts: 'البحث في المنتجات والمزارع...',
      searchProductsFarms: 'البحث في المنتجات والمزارع...',
      searchProductsPlaceholder: 'البحث في المنتجات والمزارع...',
      allProducts: 'جميع المنتجات',
      allCategories: 'جميع الفئات',
      leafyGreens: 'الخضروات الورقية',
      vegetables: 'الخضروات',
      herbs: 'الأعشاب',
      fruits: 'الفواكه',
      grains: 'الحبوب',
      crops: 'المحاصيل',
      newest: 'الأحدث',
      newestFirst: 'الأحدث أولاً',
      priceLowToHigh: 'السعر: من الأقل للأعلى',
      priceHighToLow: 'السعر: من الأعلى للأقل',
      priceAscending: 'السعر: من الأقل للأعلى',
      priceDescending: 'السعر: من الأعلى للأقل',
      highestRated: 'الأعلى تقييماً',
      ratingHighest: 'الأعلى تقييماً',
      filters: 'المرشحات',
      advancedFilters: 'المرشحات المتقدمة',
      priceRange: 'نطاق السعر',
      min: 'الحد الأدنى',
      max: 'الحد الأعلى',
      farmingMethod: 'طريقة الزراعة',
      hydroponic: 'الزراعة المائية',
      organic: 'عضوي',
      conventional: 'تقليدي',
      certifications: 'الشهادات',
      fairTrade: 'التجارة العادلة',
      location: 'الموقع',
      allLocations: 'جميع المواقع',
      riyadh: 'الرياض',
      jeddah: 'جدة',
      dammam: 'الدمام',
      mecca: 'مكة',
      availability: 'التوفر',
      inStockOnly: 'المتوفر فقط',
      sameDayDelivery: 'التوصيل في نفس اليوم',
      clearFilters: 'مسح المرشحات',
      applyFilters: 'تطبيق المرشحات',
      noProductsFound: 'لم يتم العثور على منتجات',
      adjustSearchCriteria: 'جرب تعديل معايير البحث أو التصفية',
      adjustSearchOrFilter: 'جرب تعديل معايير البحث أو التصفية',
      addToCart: 'إضافة للسلة',
      outOfStock: 'غير متوفر',
      inStock: 'متوفر',
      lowStock: 'مخزون منخفض',
      available: 'متوفر',
      daysFresh: 'أيام طازجة',
      reviews: 'تقييمات',
      harvested: 'تم الحصاد',
      minOrder: 'الحد الأدنى للطلب',
      
      // Product descriptions
      crispTenderLettuce: 'خس طري ومقرمش مزروع مائياً في بيئة محكومة. مثالي للسلطات والساندويتشات.',
      sweetJuicyTomatoes: 'طماطم كرزية حلوة وعصيرية مزروعة بطرق عضوية. مليئة بالنكهة ومثالية للوجبات الخفيفة.',
      aromaticBasilLeaves: 'أوراق ريحان عطرة طازجة، مثالية للطبخ والتزيين. مزروعة في ظروف مثلى للحصول على أقصى نكهة.',
      sweetJuicyStrawberries: 'فراولة حلوة وعصيرية مزروعة في بيوت محمية مكيفة. حجم مثالي وطعم لا يصدق.',
      
      // Farm names
      greenValleyHydroponics: 'الوادي الأخضر للزراعة المائية',
      sunnyOrganicFarm: 'مزرعة صني العضوية',
      berryFreshFarms: 'مزارع بيري الطازجة',
      
      // Certifications
      haccp: 'هاسب',
      fairTrade: 'التجارة العادلة',
      globalGap: 'جلوبال جاب',

      // Shopping Cart
      shoppingCart: 'سلة التسوق',
      cartEmpty: 'سلتك فارغة',
      startShopping: 'ابدأ التسوق لإضافة عناصر إلى سلتك',
      continueShopping: 'متابعة التسوق',
      clearCart: 'مسح السلة',
      cartSummary: 'ملخص السلة',
      subtotal: 'المجموع الفرعي',
      deliveryFee: 'رسوم التوصيل',
      tax: 'الضريبة',
      total: 'المجموع',
      checkout: 'الدفع',
      freeDeliveryOver: 'توصيل مجاني للطلبات أكثر من',
      estimatedDelivery: 'التوصيل المتوقع',
      tomorrowTwoPm: 'غداً الساعة 2 مساءً',
      per: 'لكل',
      kg: 'كيلو',
      piece: 'قطعة',
      bunch: 'حزمة',
      box: 'صندوق',

      // Home screen
      goodMorning: 'صباح الخير',
      manageFarmEfficiently: 'إدارة مزرعتك بكفاءة',
      discoverFreshProduce: 'اكتشف المنتجات الطازجة المحلية',
      quickActions: 'الإجراءات السريعة',
      todaysWeather: 'طقس اليوم',
      partlyCloudy: 'غائم جزئياً',
      humidity: 'الرطوبة',
      uvIndex: 'مؤشر الأشعة فوق البنفسجية',
      farmOverview: 'نظرة عامة على المزرعة',
      activeCrops: 'المحاصيل النشطة',
      pendingOrders: 'الطلبات المعلقة',
      thisMonth: 'هذا الشهر',
      featuredProducts: 'المنتجات المميزة',
      freshLettuce: 'خس طازج',
      organicTomatoes: 'طماطم عضوية',
      sweetCorn: 'ذرة حلوة',
      freshApples: 'تفاح طازج',
      organicCarrots: 'جزر عضوي',
      cherryTomatoes: 'طماطم كرزية',
      freshBasil: 'ريحان طازج',
      greenValleyFarm: 'مزرعة الوادي الأخضر',
      sunnyOrganicFarm: 'مزرعة صني العضوية',
      harvestHills: 'تلال الحصاد',
      recentActivity: 'النشاط الأخير',

      // Activity types
      orderCompleted: 'تم إكمال الطلب {{orderId}}',
      newOrderReceived: 'تم استلام طلب جديد',
      lettuceHarvestReady: 'الخس جاهز للحصاد',
      orderDelivered: 'تم توصيل الطلب',
      orderShipped: 'تم شحن الطلب',
      paymentProcessed: 'تمت معالجة الدفع',
      hoursAgo: 'منذ {{count}} ساعة',
      hoursAgo_other: 'منذ {{count}} ساعات',
      dayAgo: 'منذ يوم واحد',
      daysAgo: 'منذ {{count}} يوم',
      daysAgo_other: 'منذ {{count}} أيام',
      hourAgo: 'منذ ساعة واحدة',

      // Subscription Plans
      subscriptionPlans: 'خطط الاشتراك',
      freshProduceDelivered: 'منتجات طازجة توصل إلى بابك',
      myActiveSubscriptions: 'اشتراكاتي النشطة',
      availableSubscriptionPlans: 'خطط الاشتراك المتاحة',
      weeklyFreshBox: 'صندوق طازج أسبوعي',
      freshSeasonalVegetables: 'خضروات وأعشاب موسمية طازجة',
      myRooftopGarden: 'حديقة السطح الخاصة بي',
      sponsorYourOwnSection: 'ارعى قسمك الخاص للزراعة',
      nextDelivery: 'التوصيل التالي',
      includedProducts: 'المنتجات المشمولة',
      modify: 'تعديل',
      pause: 'إيقاف مؤقت',
      resume: 'استئناف',
      schedule: 'الجدولة',
      subscribeTo: 'الاشتراك في',
      subscriptionDuration: 'مدة الاشتراك',
      preferredDeliveryDay: 'يوم التوصيل المفضل',
      deliveryTimeSlot: 'فترة التوصيل',
      deliveryAddress: 'عنوان التوصيل',
      specialInstructions: 'تعليمات خاصة',
      optional: 'اختياري',
      specialInstructionsPlaceholder: 'أي تعليمات خاصة للتوصيل...',
      planPrice: 'سعر الخطة',
      frequency: 'التكرار',
      totalPerDelivery: 'المجموع لكل توصيل',
      subscribeNow: 'اشترك الآن',
      enterCompleteAddress: 'أدخل عنوان التوصيل الكامل...',

      // Subscription Plan Details
      starterFreshBox: 'صندوق البداية الطازج',
      perfectForSmallFamilies: 'مثالي للعائلات الصغيرة والأفراد',
      familyFreshBox: 'صندوق العائلة الطازج',
      idealForFamilies: 'مثالي للعائلات من 3-5 أشخاص',
      adoptARooftop: 'تبني سطح',
      seasonalSpecialtyBox: 'صندوق التخصصات الموسمية',
      curatedSelectionSeasonal: 'مجموعة منتقاة من التخصصات الموسمية',
      mostPopular: 'الأكثر شعبية',
      everyWeek: 'كل أسبوع',
      everyTwoWeeks: 'كل أسبوعين',
      everyMonth: 'كل شهر',
      months: 'أشهر',
      weeks: 'أسابيع',
      durationOptions: 'خيارات المدة',

      // Plan Features
      freshSeasonalVegetables: 'خضروات موسمية طازجة',
      recipeCardsIncluded: 'بطاقات وصفات مشمولة',
      flexibleDeliverySchedule: 'جدولة توصيل مرنة',
      cancelAnytime: 'إلغاء في أي وقت',
      premiumSeasonalVegetablesFruits: 'خضروات وفواكه موسمية مميزة',
      recipeCardsCookingTips: 'بطاقات وصفات ونصائح طبخ',
      priorityDeliverySlots: 'أوقات توصيل أولوية',
      substitutionPreferences: 'تفضيلات الاستبدال',
      yourOwnDedicatedGrowingSpace: 'مساحة زراعة مخصصة لك',
      monthlyHarvestDelivery: 'توصيل حصاد شهري',
      farmVisitAccess: 'إمكانية زيارة المزرعة',
      growthProgressUpdates: 'تحديثات تقدم النمو',
      personalizedCropSelection: 'اختيار محاصيل شخصي',
      rareSpecialtyVarieties: 'أصناف نادرة ومتخصصة',
      seasonalPeakFreshness: 'نضارة موسمية في الذروة',
      educationalContent: 'محتوى تعليمي',
      chefCollaborationRecipes: 'وصفات بالتعاون مع الطهاة',
      premiumPackaging: 'تغليف مميز',

      // Days of week
      monday: 'الاثنين',
      tuesday: 'الثلاثاء',
      wednesday: 'الأربعاء',
      thursday: 'الخميس',
      friday: 'الجمعة',
      saturday: 'السبت',
      sunday: 'الأحد',

      // Time periods
      morning: 'الصباح',
      afternoon: 'بعد الظهر',
      evening: 'المساء',

      // Status
      active: 'نشط',
      inactive: 'غير نشط',
      paused: 'متوقف مؤقتاً',
      cancelled: 'ملغي',
      expired: 'منتهي الصلاحية',
      pending: 'معلق',
      suspended: 'معلق',
      delivered: 'تم التوصيل',
      shipped: 'تم الشحن',
      processing: 'قيد المعالجة',
      confirmed: 'مؤكد',
      preparing: 'قيد التحضير',
      ready: 'جاهز',
      out_for_delivery: 'في الطريق للتوصيل',
      placed: 'تم الطلب',

      // Admin Dashboard
      hasadAdminPanel: 'لوحة إدارة حصاد',
      adminPortal: 'بوابة الإدارة',
      readOnly: 'للقراءة فقط',
      monitoringOnly: 'للمراقبة فقط',
      adminReadOnlyNotice: 'هذه لوحة إدارة للقراءة فقط لأغراض المراقبة',
      adminUser: 'مستخدم إداري',
      systemAdministrator: 'مدير النظام',
      farmers: 'المزارعون',
      consumers: 'المستهلكون',
      orders: 'الطلبات',
      alerts: 'التنبيهات',
      totalFarmers: 'إجمالي المزارعين',
      totalConsumers: 'إجمالي المستهلكين',
      activeDevices: 'الأجهزة النشطة',
      openAlerts: 'التنبيهات المفتوحة',
      monthlyRevenue: 'الإيرادات الشهرية',
      systemUptime: 'وقت تشغيل النظام',
      dataProcessed: 'البيانات المعالجة',
      avgResponseTime: 'متوسط وقت الاستجابة',
      searchFarmers: 'البحث في المزارعين...',
      searchConsumers: 'البحث في المستهلكين...',
      allStatuses: 'جميع الحالات',
      allLocations: 'جميع المواقع',
      allTiers: 'جميع المستويات',
      allSeverities: 'جميع مستويات الخطورة',
      allTypes: 'جميع الأنواع',
      farmSites: 'مواقع المزارع',
      revenue: 'الإيرادات',
      devices: 'الأجهزة',
      actions: 'الإجراءات',
      subscription: 'الاشتراك',
      totalOrders: 'إجمالي الطلبات',
      userDetails: 'تفاصيل المستخدم',
      alertDetails: 'تفاصيل التنبيه',
      totalAmount: 'المبلغ الإجمالي:',
      quantity: 'الكمية:',
      accountInformation: 'معلومات الحساب',
      contactInformation: 'معلومات الاتصال',
      farmInformation: 'معلومات المزرعة',
      deviceStatus: 'حالة الأجهزة',
      subscriptionDetails: 'تفاصيل الاشتراك',
      recentActivity: 'النشاط الأخير',
      readOnlyView: 'عرض للقراءة فقط',
      readOnlyViewDescription: 'هذا عرض للمراقبة فقط. لا يمكن إجراء تغييرات.',
      readOnlyAlertDescription: 'تفاصيل التنبيه معروضة لأغراض المراقبة فقط.',
      joinDate: 'تاريخ الانضمام',
      lastActive: 'آخر نشاط',
      role: 'الدور',
      phone: 'الهاتف',
      farmName: 'اسم المزرعة',
      farmType: 'نوع المزرعة',
      tier: 'المستوى',
      status: 'الحالة',
      expiryDate: 'تاريخ الانتهاء',
      online: 'متصل',
      offline: 'غير متصل',
      maintenance: 'صيانة',
      lastUpdate: 'آخر تحديث',
      verified: 'موثق',
      ordersCount: 'طلبات',
      sites: 'مواقع',
      showing: 'عرض',
      to: 'إلى',
      of: 'من',
      entries: 'إدخالات',
      page: 'صفحة',
      previous: 'السابق',
      next: 'التالي',
      noFarmersFound: 'لم يتم العثور على مزارعين',
      noConsumersFound: 'لم يتم العثور على مستهلكين',
      adjustSearchCriteria: 'جرب تعديل معايير البحث',
      alertId: 'معرف التنبيه',
      created: 'تم الإنشاء',
      acknowledged: 'تم الإقرار',
      additionalInformation: 'معلومات إضافية',
      statusInformation: 'معلومات الحالة',
      resolved: 'تم الحل',
      yes: 'نعم',
      no: 'لا',
      noAlertsFound: 'لم يتم العثور على تنبيهات',
      critical: 'حرج',
      warning: 'تحذير',
      info: 'معلومات',
      deviceFaults: 'أعطال الأجهزة',
      thresholdAlerts: 'تنبيهات العتبة',
      maintenanceDue: 'صيانة مستحقة',
      connectivityIssues: 'مشاكل الاتصال',
      harvestReady: 'جاهز للحصاد',
      systemUpdates: 'تحديثات النظام',

      // Tiers
      basic: 'أساسي',
      premium: 'مميز',
      enterprise: 'مؤسسي',
      trial: 'تجريبي',

      // Currencies
      usDollar: 'الدولار الأمريكي',
      euro: 'اليورو',
      britishPound: 'الجنيه الإسترليني',
      uaeDirham: 'الدرهم الإماراتي',
      kuwaitiDinar: 'الدينار الكويتي',
      qatariRiyal: 'الريال القطري',
      bahrainiDinar: 'الدينار البحريني',
      omaniRial: 'الريال العماني',
      jordanianDinar: 'الدينار الأردني',

      // Farm types
      greenhouse: 'بيت محمي',
      rooftop: 'سطح',
      indoor: 'داخلي',
      outdoor: 'خارجي',

      // IoT and Farm Management
      iotControls: 'التحكم في إنترنت الأشياء',
      deviceManagement: 'إدارة الأجهزة',
      cropManagement: 'إدارة المحاصيل',
      trackGrowth: 'تتبع تقدم النمو',
      tasks: 'المهام',
      maintenanceSchedule: 'جدولة الصيانة',
      performanceReports: 'تقارير الأداء',
      sellProducts: 'بيع منتجاتك',
      realTimeMonitoring: 'المراقبة في الوقت الفعلي',
      freshProduce: 'منتجات طازجة',
      deliveryPlans: 'خطط التوصيل',
      yourItems: 'عناصرك',
      orderHistory: 'تاريخ الطلبات',
      chatWithFarmers: 'الدردشة مع المزارعين',
      yourInsights: 'رؤاك التحليلية',

      // Settings specific
      connected: 'متصل',
      serviceRunningNormally: 'الخدمة تعمل بشكل طبيعي',
      twoMinutesAgo: 'منذ دقيقتين',
      importantNote: 'ملاحظة هامة',
      dataProtectionNotice: 'جميع بياناتك محمية ومشفرة. يتم حفظ التفضيلات محلياً على جهازك لضمان الخصوصية والأمان.',
      appVersion: 'حصاد الإصدار 1.0.0',

      // Crop Management specific
      addCrop: 'إضافة محصول',
      readyToHarvest: 'جاهز للحصاد',
      expectedYield: 'الإنتاج المتوقع',
      avgHealthScore: 'متوسط النتيجة الصحية',
      growthProgress: 'تقدم النمو',
      healthScore: 'النتيجة الصحية',
      planted: 'مزروع',
      harvest: 'الحصاد',
      quantity: 'الكمية',
      plants: 'نباتات',
      logGrowth: 'تسجيل النمو',
      addNewCrop: 'إضافة محصول جديد',
      cropName: 'اسم المحصول',
      cropNamePlaceholder: 'مثال: خس بوسطن',
      variety: 'الصنف',
      varietyPlaceholder: 'مثال: بوسطن بيب',
      category: 'الفئة',
      plantedDate: 'تاريخ الزراعة',
      expectedHarvest: 'الحصاد المتوقع',
      quantityPlanted: 'الكمية المزروعة',
      quantityPlaceholder: '200',
      expectedYieldKg: 'الإنتاج المتوقع (كيلو)',
      yieldPlaceholder: '50',
      notes: 'ملاحظات',
      cropNotesPlaceholder: 'أي ملاحظات إضافية حول هذا المحصول...',
      growthLog: 'سجل النمو',
      growthStagePercent: 'مرحلة النمو (%)',
      growthStagePlaceholder: '95',
      heightCm: 'الارتفاع (سم)',
      heightPlaceholder: '15',
      healthScoreRange: 'النتيجة الصحية (0-100)',
      healthScorePlaceholder: '92',
      actionsTaken: 'الإجراءات المتخذة',
      watering: 'الري',
      nutrientAdjustment: 'تعديل المغذيات',
      pruning: 'التقليم',
      phMonitoring: 'مراقبة الحموضة',
      pestControl: 'مكافحة الآفات',
      observationsPlaceholder: 'الملاحظات، التغييرات، التوصيات...',
      photos: 'الصور',
      clickToAddPhotos: 'انقر لإضافة الصور',
      saveLog: 'حفظ السجل',

      // Farm Dashboard specific
      farmDashboard: 'لوحة تحكم المزرعة',
      activeAlerts: 'التنبيهات النشطة',
      acknowledge: 'إقرار',
      realTimeMonitoring: 'المراقبة في الوقت الفعلي',
      temperature: 'درجة الحرارة',
      humidity: 'الرطوبة',
      phLevel: 'مستوى الحموضة',
      waterLevel: 'مستوى المياه',
      flow: 'التدفق',
      solarGeneration: 'توليد الطاقة الشمسية',
      consumption: 'الاستهلاك',
      systemStatus: 'حالة النظام',
      uptime: 'وقت التشغيل',
      nutrients: 'المغذيات',
      environment: 'البيئة',
      light: 'الإضاءة',
      performanceMetrics: 'مقاييس الأداء',
      thisWeek: 'هذا الأسبوع',
      waterPerKg: 'المياه لكل كيلو',
      energyPerKg: 'الطاقة لكل كيلو',
      carbonOffset: 'تعويض الكربون',
      milesSaved: 'الأميال المحفوظة',
      vsLastWeek: 'مقارنة بالأسبوع الماضي',
      tasksAndMaintenance: 'المهام والصيانة',
      reports: 'التقارير',
      squareMeters: 'م²',

      // Alert translations
      highTemperature: 'درجة حرارة عالية',
      temperatureHasExceeded26CFor2Hours: 'تجاوزت درجة الحرارة 26°م لمدة ساعتين',
      filterReplacementDue: 'استبدال المرشح مستحق',
      waterFilterNeedsReplacementIn3Days: 'يحتاج مرشح المياه للاستبدال خلال 3 أيام',

      // Crop detail widget translations
      healthStatus: 'الحالة الصحية',
      overallHealth: 'الصحة العامة',
      expectedYield: 'الإنتاج المتوقع',
      qualityGrade: 'درجة الجودة',
      premium: 'ممتاز',
      locationDetails: 'تفاصيل الموقع',
      farm: 'المزرعة',
      section: 'القسم',
      row: 'الصف',
      coordinates: 'الإحداثيات',
      growthTimeline: 'الجدول الزمني للنمو',
      planted: 'تاريخ الزرع',
      expectedHarvest: 'الحصاد المتوقع',
      actualHarvest: 'الحصاد الفعلي',
      environmentalConditions: 'الظروف البيئية',
      temperature: 'درجة الحرارة',
      humidity: 'الرطوبة',
      ph: 'الحموضة',
      light: 'الإضاءة',
      careHistory: 'تاريخ الرعاية',
      customerInformation: 'معلومات العميل',
      farmerInformation: 'معلومات المزارع',
      orderItems: 'عناصر الطلب',
      totalAmount: 'المبلغ الإجمالي',
      deliveryInformation: 'معلومات التوصيل',
      currentLocation: 'الموقع الحالي',
      deliveredOn: 'تم التوصيل في',
      estimatedDelivery: 'التوصيل المتوقع',
      payment: 'الدفع',
      deliveryNotes: 'ملاحظات التوصيل',
      reference: 'المرجع',
      tracking: 'التتبع',
      plantId: 'معرف النبات',
      variety: 'الصنف',
    }
  }
};

// Missing key tracker for development
class MissingKeyTracker {
  private missingKeys = new Set<string>();

  addMissingKey(key: string) {
    if (import.meta.env.DEV) {
      this.missingKeys.add(key);
      console.warn(`🔍 Missing translation key: ${key}`);
    }
  }

  getMissingKeys(): string[] {
    return Array.from(this.missingKeys);
  }

  clear() {
    this.missingKeys.clear();
  }
}

export const missingKeyTracker = new MissingKeyTracker();

// Initialize i18next
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ar', // Default to Arabic
    fallbackLng: 'en',
    debug: import.meta.env.DEV,
    
    interpolation: {
      escapeValue: false,
    },

    // Handle missing keys
    missingKeyHandler: (lng, ns, key) => {
      missingKeyTracker.addMissingKey(key);
      return key; // Return the key itself as fallback
    },

    // React i18next options
    react: {
      useSuspense: false,
    },
  });

// Get current language for formatting functions
const getCurrentLanguage = () => i18n.language || 'ar';

// Formatting utility functions
export const formatDate = (date: Date | string | number, locale?: string): string => {
  try {
    const targetLocale = locale || getCurrentLanguage();
    const dateObj = new Date(date);
    
    if (isNaN(dateObj.getTime())) {
      return String(date);
    }

    return new Intl.DateTimeFormat(targetLocale === 'ar' ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(dateObj);
  } catch (error) {
    console.warn('Date formatting failed:', error);
    return String(date);
  }
};

export const formatNumber = (number: number, options?: Intl.NumberFormatOptions): string => {
  try {
    const locale = getCurrentLanguage();
    return new Intl.NumberFormat(locale === 'ar' ? 'ar-SA' : 'en-US', options).format(number);
  } catch (error) {
    console.warn('Number formatting failed:', error);
    return String(number);
  }
};

export const formatCurrency = (amount: number, currency = 'SAR', locale?: string): string => {
  try {
    const targetLocale = locale || getCurrentLanguage();
    return new Intl.NumberFormat(targetLocale === 'ar' ? 'ar-SA' : 'en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch (error) {
    console.warn('Currency formatting failed:', error);
    return `${currency} ${amount.toFixed(2)}`;
  }
};

export const formatRelativeTime = (date: Date | string | number): string => {
  try {
    const locale = getCurrentLanguage();
    const now = new Date();
    const targetDate = new Date(date);
    
    if (isNaN(targetDate.getTime())) {
      return String(date);
    }

    const diffMs = targetDate.getTime() - now.getTime();
    const diffMinutes = Math.round(diffMs / (1000 * 60));
    const diffHours = Math.round(diffMs / (1000 * 60 * 60));
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

    const rtf = new Intl.RelativeTimeFormat(locale === 'ar' ? 'ar-SA' : 'en-US', { 
      numeric: 'auto' 
    });

    if (Math.abs(diffMinutes) < 60) {
      return rtf.format(diffMinutes, 'minute');
    } else if (Math.abs(diffHours) < 24) {
      return rtf.format(diffHours, 'hour');
    } else if (Math.abs(diffDays) < 30) {
      return rtf.format(diffDays, 'day');
    } else {
      return formatDate(date, locale);
    }
  } catch (error) {
    console.warn('Relative time formatting failed:', error);
    return formatDate(date);
  }
};

// Internationalized formatting functions for components
export const formatI18nCurrency = (amount: number, currency = 'SAR', locale?: string): string => {
  return formatCurrency(amount, currency, locale);
};

export const formatI18nNumber = (number: number, options?: Intl.NumberFormatOptions): string => {
  return formatNumber(number, options);
};

// Language change function with proper direction handling
export const changeLanguage = (language: 'ar' | 'en') => {
  i18n.changeLanguage(language);
  
  // Update document direction and language
  document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = language;
  
  // Store preference
  try {
    localStorage.setItem('hasad-language', language);
  } catch (error) {
    console.warn('Could not save language preference:', error);
  }
  
  // Dispatch custom event for components that need to react to language changes
  window.dispatchEvent(new CustomEvent('languageChanged', { 
    detail: { language } 
  }));
};

export default i18n;