import React from 'react';
import { Leaf, TrendingUp, Users, Shield, Zap, Award } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const BrandingPanel: React.FC = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: TrendingUp,
      titleKey: 'smartFarming',
      descKey: 'smartFarmingDesc',
    },
    {
      icon: Users,
      titleKey: 'directConnect',
      descKey: 'directConnectDesc',
    },
    {
      icon: Shield,
      titleKey: 'secureTransactions',
      descKey: 'secureTransactionsDesc',
    },
  ];

  return (
    <div className="hidden lg:flex lg:flex-col lg:justify-center lg:items-center relative overflow-hidden bg-gradient-to-br from-green-600 via-green-500 to-teal-600 p-12">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.15),transparent_50%)]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-xl text-center">
        {/* Logo and Brand */}
        <div className="mb-12">
          <div className="w-24 h-24 mx-auto mb-6 bg-white rounded-3xl flex items-center justify-center shadow-2xl transform transition-transform hover:scale-105">
            <Leaf className="w-12 h-12 text-green-600" strokeWidth={2.5} />
          </div>
          <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">HASAD</h1>
          <p className="text-xl text-green-50 font-medium">{t('appSlogan')}</p>
        </div>

        {/* Feature Highlights */}
        <div className="space-y-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-left transform transition-all duration-300 hover:bg-white/15 hover:scale-105"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" strokeWidth={2} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {t(feature.titleKey) || feature.titleKey}
                    </h3>
                    <p className="text-sm text-green-50 leading-relaxed">
                      {t(feature.descKey) || feature.descKey}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats or Badge */}
        <div className="mt-12 flex items-center justify-center gap-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-2">
              <Award className="w-5 h-5 text-yellow-300" />
              <p className="text-3xl font-bold text-white">500+</p>
            </div>
            <p className="text-sm text-green-100">Active Farms</p>
          </div>
          <div className="w-px h-12 bg-white/20" />
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-2">
              <Zap className="w-5 h-5 text-yellow-300" />
              <p className="text-3xl font-bold text-white">24/7</p>
            </div>
            <p className="text-sm text-green-100">IoT Monitoring</p>
          </div>
        </div>
      </div>
    </div>
  );
};
