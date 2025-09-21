/**
 * Secure Storage Utility for Remember Me Functionality
 *
 * This module provides secure storage methods for user credentials
 * with encryption, expiration, and error handling capabilities.
 */

// Simple encryption/decryption using base64 and basic obfuscation
// Note: For production, consider using Web Crypto API or a proper encryption library
class SecureStorage {
  private readonly storageKey = 'hasad_remember_me';
  private readonly expirationKey = 'hasad_remember_me_exp';
  private readonly defaultExpirationDays = 30;

  /**
   * Simple encryption using base64 encoding with salt
   * In production, use proper encryption libraries like crypto-js
   */
  private encrypt(data: string): string {
    try {
      const salt = 'hasad_secure_salt_2024';
      const encoded = btoa(salt + data + salt);
      return encoded;
    } catch (error) {
      console.error('Encryption failed:', error);
      return '';
    }
  }

  /**
   * Simple decryption for base64 encoded data
   */
  private decrypt(encryptedData: string): string {
    try {
      const salt = 'hasad_secure_salt_2024';
      const decoded = atob(encryptedData);
      return decoded.replace(new RegExp(salt, 'g'), '');
    } catch (error) {
      console.error('Decryption failed:', error);
      return '';
    }
  }

  /**
   * Check if storage is available and functional
   */
  private isStorageAvailable(): boolean {
    try {
      const testKey = '__storage_test__';
      localStorage.setItem(testKey, 'test');
      localStorage.removeItem(testKey);
      return true;
    } catch (error) {
      console.warn('localStorage is not available:', error);
      return false;
    }
  }

  /**
   * Check if stored data has expired
   */
  private isExpired(): boolean {
    try {
      const expirationTime = localStorage.getItem(this.expirationKey);
      if (!expirationTime) return true;

      const expTime = parseInt(expirationTime, 10);
      return Date.now() > expTime;
    } catch (error) {
      console.error('Error checking expiration:', error);
      return true;
    }
  }

  /**
   * Store user credentials securely
   * Note: Only stores email, never stores actual passwords
   */
  public storeCredentials(email: string, rememberMe: boolean): boolean {
    if (!this.isStorageAvailable()) {
      console.warn('Storage not available, cannot remember credentials');
      return false;
    }

    try {
      if (rememberMe) {
        // Only store email, never store passwords for security
        const credentialData = JSON.stringify({
          email: email,
          timestamp: Date.now(),
        });

        const encryptedData = this.encrypt(credentialData);
        if (!encryptedData) return false;

        // Set expiration time
        const expirationTime = Date.now() + this.defaultExpirationDays * 24 * 60 * 60 * 1000;

        localStorage.setItem(this.storageKey, encryptedData);
        localStorage.setItem(this.expirationKey, expirationTime.toString());
        localStorage.setItem('hasad-remember-me', 'true');

        console.log('Credentials stored securely');
        return true;
      } else {
        // Clear stored credentials
        this.clearCredentials();
        return true;
      }
    } catch (error) {
      console.error('Failed to store credentials:', error);
      return false;
    }
  }

  /**
   * Retrieve stored credentials if available and not expired
   */
  public getStoredCredentials(): { email: string; rememberMe: boolean } | null {
    if (!this.isStorageAvailable()) {
      return null;
    }

    try {
      // Check if data has expired
      if (this.isExpired()) {
        this.clearCredentials();
        return null;
      }

      const encryptedData = localStorage.getItem(this.storageKey);
      const rememberMeState = localStorage.getItem('hasad-remember-me');

      if (!encryptedData || rememberMeState !== 'true') {
        return null;
      }

      const decryptedData = this.decrypt(encryptedData);
      if (!decryptedData) return null;

      const credentialData = JSON.parse(decryptedData);

      return {
        email: credentialData.email || '',
        rememberMe: true,
      };
    } catch (error) {
      console.error('Failed to retrieve credentials:', error);
      this.clearCredentials(); // Clear corrupted data
      return null;
    }
  }

  /**
   * Clear all stored credentials and related data
   */
  public clearCredentials(): void {
    try {
      localStorage.removeItem(this.storageKey);
      localStorage.removeItem(this.expirationKey);
      localStorage.removeItem('hasad-remember-me');
      console.log('Stored credentials cleared');
    } catch (error) {
      console.error('Failed to clear credentials:', error);
    }
  }

  /**
   * Get remaining time until expiration (in days)
   */
  public getExpirationInfo(): { isExpired: boolean; daysRemaining: number } {
    try {
      const expirationTime = localStorage.getItem(this.expirationKey);
      if (!expirationTime) {
        return { isExpired: true, daysRemaining: 0 };
      }

      const expTime = parseInt(expirationTime, 10);
      const now = Date.now();
      const isExpired = now > expTime;
      const daysRemaining = Math.max(0, Math.ceil((expTime - now) / (24 * 60 * 60 * 1000)));

      return { isExpired, daysRemaining };
    } catch (error) {
      console.error('Error getting expiration info:', error);
      return { isExpired: true, daysRemaining: 0 };
    }
  }
}

// Export singleton instance
export const secureStorage = new SecureStorage();
