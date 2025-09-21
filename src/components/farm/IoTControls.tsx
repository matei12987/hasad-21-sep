import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Power,
  Droplets,
  Sun,
  Wind,
  Beaker,
  Clock,
  Settings,
  Play,
  Pause,
  RotateCcw,
  AlertCircle,
} from 'lucide-react';
import { IoTControl, FarmSite } from '../../types';

interface IoTControlsProps {
  selectedSite: FarmSite;
}

export const IoTControls: React.FC<IoTControlsProps> = ({ selectedSite }) => {
  const { t } = useTranslation();
  const [controls, setControls] = useState<IoTControl[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedControl, setSelectedControl] = useState<IoTControl | null>(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockControls: IoTControl[] = [
      {
        id: '1',
        site_id: selectedSite.id,
        device_type: 'pump',
        name: 'Main Water Pump',
        status: 'auto',
        schedule: {
          enabled: true,
          start_time: '06:00',
          end_time: '18:00',
          days: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
          duration: 15,
        },
        settings: {
          flow_rate: 2.5,
          pressure: 1.2,
        },
        last_updated: new Date().toISOString(),
      },
      {
        id: '2',
        site_id: selectedSite.id,
        device_type: 'irrigation',
        name: 'Drip Irrigation Zone 1',
        status: 'on',
        schedule: {
          enabled: true,
          start_time: '07:00',
          end_time: '19:00',
          days: ['mon', 'wed', 'fri'],
          duration: 30,
        },
        settings: {
          zone: 1,
          flow_rate: 1.8,
        },
        last_updated: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      },
      {
        id: '3',
        site_id: selectedSite.id,
        device_type: 'lighting',
        name: 'LED Grow Lights',
        status: 'auto',
        schedule: {
          enabled: true,
          start_time: '06:00',
          end_time: '22:00',
          days: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
        },
        settings: {
          intensity: 85,
          spectrum: 'full',
        },
        last_updated: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
      },
      {
        id: '4',
        site_id: selectedSite.id,
        device_type: 'ventilation',
        name: 'Exhaust Fans',
        status: 'auto',
        schedule: {
          enabled: true,
          start_time: '08:00',
          end_time: '20:00',
          days: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
        },
        settings: {
          speed: 60,
          temperature_trigger: 26,
        },
        last_updated: new Date(Date.now() - 1 * 60 * 1000).toISOString(),
      },
      {
        id: '5',
        site_id: selectedSite.id,
        device_type: 'nutrient_doser',
        name: 'Nutrient Dosing System',
        status: 'auto',
        schedule: {
          enabled: true,
          start_time: '08:00',
          end_time: '16:00',
          days: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
          duration: 5,
        },
        settings: {
          ec_target: 1.8,
          ph_target: 6.0,
          dosing_rate: 0.5,
        },
        last_updated: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
      },
    ];

    setControls(mockControls);
    setLoading(false);
  }, [selectedSite]);

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType) {
      case 'pump':
        return <Droplets className="w-6 h-6" />;
      case 'irrigation':
        return <Droplets className="w-6 h-6" />;
      case 'lighting':
        return <Sun className="w-6 h-6" />;
      case 'ventilation':
        return <Wind className="w-6 h-6" />;
      case 'nutrient_doser':
        return <Beaker className="w-6 h-6" />;
      default:
        return <Settings className="w-6 h-6" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on':
        return 'text-green-600 bg-green-100';
      case 'off':
        return 'text-gray-600 bg-gray-100';
      case 'auto':
        return 'text-blue-600 bg-blue-100';
      case 'error':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const handleControlToggle = async (control: IoTControl, newStatus: string) => {
    try {
      // API call to update control status
      const updatedControl = {
        ...control,
        status: newStatus as any,
        last_updated: new Date().toISOString(),
      };
      setControls(prev => prev.map(c => (c.id === control.id ? updatedControl : c)));
    } catch (error) {
      console.error('Failed to update control:', error);
    }
  };

  const handleScheduleUpdate = async (control: IoTControl, schedule: any) => {
    try {
      // API call to update schedule
      const updatedControl = { ...control, schedule, last_updated: new Date().toISOString() };
      setControls(prev => prev.map(c => (c.id === control.id ? updatedControl : c)));
      setShowScheduleModal(false);
      setSelectedControl(null);
    } catch (error) {
      console.error('Failed to update schedule:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600" />
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-4">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Settings className="w-6 h-6 text-green-600" />
          IoT Device Controls - {selectedSite.name}
        </h2>

        <div className="grid gap-4">
          {controls.map(control => (
            <div key={control.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${getStatusColor(control.status)}`}>
                    {getDeviceIcon(control.device_type)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 truncate max-w-[150px] sm:max-w-none">
                      {control.name}
                    </h3>
                    <p className="text-sm text-gray-600 capitalize truncate max-w-[150px] sm:max-w-none">
                      {control.device_type.replace('_', ' ')} • Status: {control.status}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(control.status)}`}
                  >
                    {control.status.toUpperCase()}
                  </span>
                  <button
                    onClick={() => {
                      setSelectedControl(control);
                      setShowScheduleModal(true);
                    }}
                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Schedule Settings"
                  >
                    <Clock className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex items-center gap-2 mb-4">
                <button
                  onClick={() => handleControlToggle(control, 'on')}
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    control.status === 'on'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-green-50 hover:text-green-700'
                  }`}
                >
                  <Play className="w-4 h-4" />
                  ON
                </button>

                <button
                  onClick={() => handleControlToggle(control, 'off')}
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    control.status === 'off'
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-700'
                  }`}
                >
                  <Pause className="w-4 h-4" />
                  OFF
                </button>

                <button
                  onClick={() => handleControlToggle(control, 'auto')}
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    control.status === 'auto'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-700'
                  }`}
                >
                  <RotateCcw className="w-4 h-4" />
                  AUTO
                </button>
              </div>

              {/* Device Settings */}
              <div className="bg-gray-50 rounded-lg p-3">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Current Settings</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-sm">
                  {Object.entries(control.settings).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center gap-2">
                      <span className="text-gray-600 capitalize text-xs sm:text-sm truncate">
                        {key.replace('_', ' ')}:
                      </span>
                      <span className="font-medium text-gray-900 text-xs sm:text-sm shrink-0">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Schedule Info */}
              {control.schedule?.enabled && (
                <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800 truncate">
                      Scheduled Operation
                    </span>
                  </div>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p className="truncate">
                      {control.schedule.start_time} - {control.schedule.end_time}
                    </p>
                    <p className="capitalize truncate">{control.schedule.days.join(', ')}</p>
                    {control.schedule.duration && (
                      <p className="truncate">Duration: {control.schedule.duration} minutes</p>
                    )}
                  </div>
                </div>
              )}

              <div className="mt-3 text-xs text-gray-500">
                <span className="truncate block">
                  Last updated: {new Date(control.last_updated).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Schedule Modal */}
      {showScheduleModal && selectedControl && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Schedule Settings - {selectedControl.name}
              </h3>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedControl.schedule?.enabled || false}
                    onChange={e => {
                      const newSchedule = {
                        ...selectedControl.schedule,
                        enabled: e.target.checked,
                      };
                      setSelectedControl({
                        ...selectedControl,
                        schedule: newSchedule,
                      });
                    }}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm font-medium text-gray-700">Enable Scheduling</span>
                </label>
              </div>

              {selectedControl.schedule?.enabled && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Start Time
                      </label>
                      <input
                        type="time"
                        value={selectedControl.schedule.start_time}
                        onChange={e => {
                          const newSchedule = {
                            ...selectedControl.schedule,
                            start_time: e.target.value,
                          };
                          setSelectedControl({
                            ...selectedControl,
                            schedule: newSchedule,
                          });
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        End Time
                      </label>
                      <input
                        type="time"
                        value={selectedControl.schedule.end_time}
                        onChange={e => {
                          const newSchedule = {
                            ...selectedControl.schedule,
                            end_time: e.target.value,
                          };
                          setSelectedControl({
                            ...selectedControl,
                            schedule: newSchedule,
                          });
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {selectedControl.schedule.duration !== undefined && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Duration (minutes)
                      </label>
                      <input
                        type="number"
                        value={selectedControl.schedule.duration}
                        onChange={e => {
                          const newSchedule = {
                            ...selectedControl.schedule,
                            duration: parseInt(e.target.value),
                          };
                          setSelectedControl({
                            ...selectedControl,
                            schedule: newSchedule,
                          });
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Days of Week
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].map(day => (
                        <label key={day} className="flex items-center gap-1">
                          <input
                            type="checkbox"
                            checked={selectedControl.schedule?.days.includes(day) || false}
                            onChange={e => {
                              const currentDays = selectedControl.schedule?.days || [];
                              const newDays = e.target.checked
                                ? [...currentDays, day]
                                : currentDays.filter(d => d !== day);
                              const newSchedule = {
                                ...selectedControl.schedule,
                                days: newDays,
                              };
                              setSelectedControl({
                                ...selectedControl,
                                schedule: newSchedule,
                              });
                            }}
                            className="w-3 h-3 text-blue-600"
                          />
                          <span className="text-xs capitalize">{day}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => {
                  setShowScheduleModal(false);
                  setSelectedControl(null);
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleScheduleUpdate(selectedControl, selectedControl.schedule)}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Save Schedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
