import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Calendar,
  CheckSquare,
  Clock,
  AlertTriangle,
  Plus,
  Filter,
  User,
  Repeat,
  Bell,
} from 'lucide-react';
import { Task, FarmSite } from '../../types';

interface TasksAndMaintenanceProps {
  selectedSite: FarmSite;
}

export const TasksAndMaintenance: React.FC<TasksAndMaintenanceProps> = ({ selectedSite }) => {
  const { t } = useTranslation();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showAddTask, setShowAddTask] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockTasks: Task[] = [
      {
        id: '1',
        site_id: selectedSite.id,
        title: 'Clean Water Filters',
        description: 'Replace and clean all water filtration systems',
        type: 'maintenance',
        priority: 'high',
        status: 'pending',
        assigned_to: 'farmer1',
        due_date: '2024-02-15',
        checklist: [
          { id: '1', item: 'Turn off water system', completed: false },
          { id: '2', item: 'Remove old filters', completed: false },
          { id: '3', item: 'Clean filter housings', completed: false },
          { id: '4', item: 'Install new filters', completed: false },
          { id: '5', item: 'Test water flow', completed: false },
          { id: '6', item: 'Document replacement date', completed: false },
        ],
        recurring: {
          enabled: true,
          frequency: 'monthly',
          interval: 1,
        },
        created_at: '2024-02-01T00:00:00Z',
        updated_at: '2024-02-01T00:00:00Z',
      },
      {
        id: '2',
        site_id: selectedSite.id,
        title: 'Harvest Lettuce Crop',
        description: 'Harvest mature lettuce plants from section A',
        type: 'harvesting',
        priority: 'urgent',
        status: 'in_progress',
        assigned_to: 'farmer1',
        due_date: '2024-02-12',
        checklist: [
          { id: '1', item: 'Prepare harvest containers', completed: true },
          { id: '2', item: 'Harvest mature plants', completed: true },
          { id: '3', item: 'Sort and package', completed: false },
          { id: '4', item: 'Update inventory', completed: false },
          { id: '5', item: 'Clean harvest area', completed: false },
        ],
        recurring: {
          enabled: false,
          frequency: 'weekly',
          interval: 1,
        },
        created_at: '2024-02-10T00:00:00Z',
        updated_at: '2024-02-11T00:00:00Z',
      },
      {
        id: '3',
        site_id: selectedSite.id,
        title: 'Nutrient Solution Change',
        description: 'Replace nutrient solution in hydroponic system',
        type: 'nutrient_change',
        priority: 'medium',
        status: 'completed',
        assigned_to: 'farmer1',
        due_date: '2024-02-10',
        completed_date: '2024-02-10',
        checklist: [
          { id: '1', item: 'Test current EC and pH levels', completed: true },
          { id: '2', item: 'Drain old solution', completed: true },
          { id: '3', item: 'Clean reservoir', completed: true },
          { id: '4', item: 'Mix new nutrient solution', completed: true },
          { id: '5', item: 'Fill reservoir', completed: true },
          { id: '6', item: 'Test and adjust pH/EC', completed: true },
        ],
        recurring: {
          enabled: true,
          frequency: 'weekly',
          interval: 2,
        },
        created_at: '2024-02-08T00:00:00Z',
        updated_at: '2024-02-10T00:00:00Z',
      },
      {
        id: '4',
        site_id: selectedSite.id,
        title: 'System Inspection',
        description: 'Weekly inspection of all growing systems',
        type: 'inspection',
        priority: 'medium',
        status: 'overdue',
        assigned_to: 'farmer1',
        due_date: '2024-02-08',
        checklist: [
          { id: '1', item: 'Check pump operations', completed: false },
          { id: '2', item: 'Inspect irrigation lines', completed: false },
          { id: '3', item: 'Test sensors', completed: false },
          { id: '4', item: 'Check lighting systems', completed: false },
          { id: '5', item: 'Document findings', completed: false },
        ],
        recurring: {
          enabled: true,
          frequency: 'weekly',
          interval: 1,
        },
        created_at: '2024-02-01T00:00:00Z',
        updated_at: '2024-02-01T00:00:00Z',
      },
    ];

    setTasks(mockTasks);
    setLoading(false);
  }, [selectedSite]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'maintenance':
        return '🔧';
      case 'planting':
        return '🌱';
      case 'harvesting':
        return '🌾';
      case 'cleaning':
        return '🧽';
      case 'inspection':
        return '🔍';
      case 'nutrient_change':
        return '💧';
      default:
        return '📋';
    }
  };

  const filteredTasks = tasks.filter(task => {
    const statusMatch = filterStatus === 'all' || task.status === filterStatus;
    const typeMatch = filterType === 'all' || task.type === filterType;
    return statusMatch && typeMatch;
  });

  const handleTaskStatusUpdate = (taskId: string, newStatus: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId
          ? {
              ...task,
              status: newStatus as any,
              completed_date: newStatus === 'completed' ? new Date().toISOString() : undefined,
              updated_at: new Date().toISOString(),
            }
          : task
      )
    );
  };

  const handleChecklistUpdate = (taskId: string, checklistItemId: string, completed: boolean) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId
          ? {
              ...task,
              checklist: task.checklist.map(item =>
                item.id === checklistItemId ? { ...item, completed } : item
              ),
              updated_at: new Date().toISOString(),
            }
          : task
      )
    );
  };

  const getTaskProgress = (task: Task) => {
    const completedItems = task.checklist.filter(item => item.completed).length;
    return Math.round((completedItems / task.checklist.length) * 100);
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
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <CheckSquare className="w-6 h-6 text-green-600" />
            Tasks & Maintenance - {selectedSite.name}
          </h2>
          <button
            onClick={() => setShowAddTask(true)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Task
          </button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {tasks.filter(t => t.status === 'pending').length}
            </div>
            <div className="text-sm text-gray-600">Pending</div>
          </div>
          <div className="bg-yellow-50 p-3 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">
              {tasks.filter(t => t.status === 'in_progress').length}
            </div>
            <div className="text-sm text-gray-600">In Progress</div>
          </div>
          <div className="bg-red-50 p-3 rounded-lg">
            <div className="text-2xl font-bold text-red-600">
              {tasks.filter(t => t.status === 'overdue').length}
            </div>
            <div className="text-sm text-gray-600">Overdue</div>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {tasks.filter(t => t.status === 'completed').length}
            </div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-600" />
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>

          <select
            value={filterType}
            onChange={e => setFilterType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          >
            <option value="all">All Types</option>
            <option value="maintenance">Maintenance</option>
            <option value="planting">Planting</option>
            <option value="harvesting">Harvesting</option>
            <option value="cleaning">Cleaning</option>
            <option value="inspection">Inspection</option>
            <option value="nutrient_change">Nutrient Change</option>
          </select>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.map(task => (
          <div key={task.id} className="bg-white rounded-xl shadow-lg p-4">
            {/* Task Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">{getTypeIcon(task.type)}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate pr-2">
                    {task.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2 break-words leading-tight">
                    {task.description}
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mt-2 text-xs sm:text-sm text-gray-500">
                    <span className="flex items-center gap-1 shrink-0 truncate">
                      <Calendar className="w-4 h-4" />
                      <span className="truncate">
                        Due:{' '}
                        {new Date(task.due_date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </span>
                    <span className="flex items-center gap-1 shrink-0 truncate">
                      <User className="w-4 h-4" />
                      <span className="truncate">{task.assigned_to}</span>
                    </span>
                    {task.recurring.enabled && (
                      <span className="flex items-center gap-1 shrink-0 truncate">
                        <Repeat className="w-4 h-4" />
                        <span className="truncate">{task.recurring.frequency}</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2 shrink-0">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)} whitespace-nowrap`}
                >
                  {task.priority}
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)} whitespace-nowrap`}
                >
                  {task.status.replace('_', ' ')}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs sm:text-sm font-medium text-gray-700">Progress</span>
                <span className="text-xs sm:text-sm font-bold text-green-600">
                  {getTaskProgress(task)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${getTaskProgress(task)}%` }}
                />
              </div>
            </div>

            {/* Checklist */}
            <div className="mb-4">
              <h4 className="text-xs sm:text-sm font-medium text-gray-700 mb-2">Checklist</h4>
              <div className="space-y-2">
                {task.checklist.slice(0, 3).map(item => (
                  <label key={item.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={e => handleChecklistUpdate(task.id, item.id, e.target.checked)}
                      className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 rounded focus:ring-green-500 shrink-0"
                    />
                    <span
                      className={`text-xs sm:text-sm break-words leading-tight ${item.completed ? 'line-through text-gray-500' : 'text-gray-700'}`}
                    >
                      {item.item}
                    </span>
                  </label>
                ))}
                {task.checklist.length > 3 && (
                  <button
                    onClick={() => setSelectedTask(task)}
                    className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 truncate"
                  >
                    +{task.checklist.length - 3} more items
                  </button>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2">
              {task.status === 'pending' && (
                <button
                  onClick={() => handleTaskStatusUpdate(task.id, 'in_progress')}
                  className="flex-1 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-xs sm:text-sm font-medium whitespace-nowrap"
                >
                  Start Task
                </button>
              )}
              {task.status === 'in_progress' && (
                <button
                  onClick={() => handleTaskStatusUpdate(task.id, 'completed')}
                  className="flex-1 px-3 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-xs sm:text-sm font-medium whitespace-nowrap"
                >
                  Mark Complete
                </button>
              )}
              <button
                onClick={() => setSelectedTask(task)}
                className="flex-1 px-3 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-xs sm:text-sm font-medium whitespace-nowrap"
              >
                View Details
              </button>
            </div>

            {task.completed_date && (
              <div className="mt-3 text-xs text-gray-500 truncate">
                Completed: {new Date(task.completed_date).toLocaleString()}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Task Details Modal */}
      {selectedTask && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">{selectedTask.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{selectedTask.description}</p>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Type:</span>
                    <span className="ml-2 font-medium capitalize">
                      {selectedTask.type.replace('_', ' ')}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Priority:</span>
                    <span
                      className={`ml-2 px-2 py-1 rounded text-xs font-medium ${getPriorityColor(selectedTask.priority)}`}
                    >
                      {selectedTask.priority}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Due Date:</span>
                    <span className="ml-2 font-medium">
                      {new Date(selectedTask.due_date).toLocaleDateString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Assigned:</span>
                    <span className="ml-2 font-medium">{selectedTask.assigned_to}</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Complete Checklist</h4>
                  <div className="space-y-2">
                    {selectedTask.checklist.map(item => (
                      <label key={item.id} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={item.completed}
                          onChange={e =>
                            handleChecklistUpdate(selectedTask.id, item.id, e.target.checked)
                          }
                          className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                        />
                        <span
                          className={`text-sm ${item.completed ? 'line-through text-gray-500' : 'text-gray-700'}`}
                        >
                          {item.item}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {selectedTask.recurring.enabled && (
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Repeat className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">Recurring Task</span>
                    </div>
                    <p className="text-sm text-blue-700">
                      Repeats {selectedTask.recurring.frequency} (every{' '}
                      {selectedTask.recurring.interval}{' '}
                      {selectedTask.recurring.frequency.slice(0, -2)})
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => setSelectedTask(null)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
              {selectedTask.status !== 'completed' && (
                <button
                  onClick={() => {
                    handleTaskStatusUpdate(selectedTask.id, 'completed');
                    setSelectedTask(null);
                  }}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Mark Complete
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add Task Modal */}
      {showAddTask && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Add New Task</h3>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="e.g., Clean Water Filters"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="Detailed description of the task..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500">
                    <option value="maintenance">Maintenance</option>
                    <option value="planting">Planting</option>
                    <option value="harvesting">Harvesting</option>
                    <option value="cleaning">Cleaning</option>
                    <option value="inspection">Inspection</option>
                    <option value="nutrient_change">Nutrient Change</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500">
                  <option value="farmer1">Farmer 1</option>
                  <option value="farmer2">Farmer 2</option>
                  <option value="maintenance_team">Maintenance Team</option>
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-gray-700">
                    Make this a recurring task
                  </span>
                </label>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => setShowAddTask(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowAddTask(false)}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
