import React, { useState } from 'react';
import { usePet } from '../context/PetContext';
import type { CareReminder } from '../types';
import { 
  Bell, Plus, Trash2, CheckCircle2, Clock, Calendar, 
  Pill, Syringe, Sparkles, AlertCircle, ShieldCheck, X
} from 'lucide-react';

export const CareReminders: React.FC = () => {
  const { pets, reminders, addReminder, toggleReminder, deleteReminder, subscription } = usePet();

  const [isAdding, setIsAdding] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>(() => {
    return typeof window !== 'undefined' && 'Notification' in window
      ? Notification.permission
      : 'default';
  });

  // Form State
  const [petId, setPetId] = useState(pets[0]?.id || '');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<CareReminder['category']>('vaccine');
  const [dueDate, setDueDate] = useState('');
  const [notes, setNotes] = useState('');
  const [prescribedByVet, setPrescribedByVet] = useState(true);

  const requestNotificationAccess = async () => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      try {
        const permission = await Notification.requestPermission();
        setNotificationPermission(permission);
        if (permission === 'granted') {
          new Notification('PetSafe AI Reminders Activated 🐶🐱', {
            body: 'You will receive timely care & vaccine notifications for your pets!',
            icon: '/favicon.ico'
          });
        }
      } catch (err) {
        console.error('Error requesting notification permission:', err);
      }
    } else {
      alert('Browser notifications are not supported on this browser/platform.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !dueDate) return;

    addReminder({
      petId: petId || (pets[0]?.id ?? 'pet-generic'),
      title,
      category,
      dueDate,
      notes,
      completed: false,
      prescribedByVet
    });

    setTitle('');
    setDueDate('');
    setNotes('');
    setIsAdding(false);
  };

  const getCategoryIcon = (cat: CareReminder['category']) => {
    switch (cat) {
      case 'vaccine':
        return <Syringe className="w-4 h-4 text-emerald-600" />;
      case 'medication':
        return <Pill className="w-4 h-4 text-sky-600" />;
      case 'flea_tick':
        return <ShieldCheck className="w-4 h-4 text-amber-600" />;
      case 'vet_visit':
      default:
        return <Calendar className="w-4 h-4 text-purple-600" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Vaccination & Care Reminders
          </h1>
          <p className="text-sm text-slate-600">
            Never miss vital core vaccines, flea & tick chewables, or veterinarian appointments.
          </p>
        </div>

        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xs transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Schedule Reminder</span>
          </button>
        )}
      </div>

      {/* Notification Status Banner */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="p-2 rounded-xl bg-white shadow-xs">
            <Bell className={`w-5 h-5 ${notificationPermission === 'granted' ? 'text-emerald-600' : 'text-amber-500'}`} />
          </span>
          <div>
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              System Notification Status: {notificationPermission === 'granted' ? '🟢 Active & Configured' : '🟡 Permission Needed'}
            </h4>
            <p className="text-xs text-slate-500">
              {notificationPermission === 'granted'
                ? 'Browser notifications are enabled. PetSafe AI will notify you when a dose or booster is due.'
                : 'Click below to allow browser push notifications for medication alarms and vaccine alerts.'}
            </p>
          </div>
        </div>

        {notificationPermission !== 'granted' && (
          <button
            onClick={requestNotificationAccess}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition flex-shrink-0"
          >
            Enable Notifications
          </button>
        )}
      </div>

      {/* Add Reminder Card */}
      {isAdding && (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl border-2 border-emerald-400 p-6 sm:p-8 shadow-md space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h3 className="font-extrabold text-lg text-slate-900">Schedule Care Reminder</h3>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="p-1 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Pet Picker */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Assign Pet *
              </label>
              <select
                value={petId}
                onChange={(e) => setPetId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-white"
              >
                {pets.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.species === 'dog' ? '🐶' : '🐱'} {p.name} ({p.breed || p.species})
                  </option>
                ))}
                {pets.length === 0 && <option value="general">Generic Pet</option>}
              </select>
            </div>

            {/* Category */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-white"
              >
                <option value="vaccine">💉 Vaccination Booster (Rabies, DHPP, FVRCP)</option>
                <option value="flea_tick">🛡️ Flea, Tick & Heartworm Prevention</option>
                <option value="medication">💊 Vet-Prescribed Medication</option>
                <option value="vet_visit">🩺 Vet Wellness Exam / Appointment</option>
                <option value="grooming">✂️ Grooming / Nail Trim</option>
              </select>
            </div>

            {/* Reminder Title */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Reminder Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Rabies 3-Year Booster, Simparica Trio..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            {/* Due Date */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Due Date *
              </label>
              <input
                type="date"
                required
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Instructions & Notes (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Give 1 tablet with food in the morning, Dr. Smith clinic..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>

          {/* Prescribed Checkbox */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="prescribed"
              checked={prescribedByVet}
              onChange={(e) => setPrescribedByVet(e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded"
            />
            <label htmlFor="prescribed" className="text-xs text-slate-700 font-medium cursor-pointer">
              Prescribed or recommended by a licensed veterinarian
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-bold transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition"
            >
              Save Reminder
            </button>
          </div>
        </form>
      )}

      {/* Reminders List */}
      <div className="space-y-3">
        {reminders.map((rem) => {
          const pet = pets.find((p) => p.id === rem.petId);

          return (
            <div
              key={rem.id}
              className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                rem.completed
                  ? 'bg-slate-50 border-slate-200 opacity-60'
                  : 'bg-white border-slate-200 shadow-xs hover:border-emerald-300'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <button
                  type="button"
                  onClick={() => toggleReminder(rem.id)}
                  className={`mt-0.5 p-1 rounded-full transition ${
                    rem.completed
                      ? 'text-emerald-600'
                      : 'text-slate-300 hover:text-emerald-500'
                  }`}
                  title={rem.completed ? 'Mark as pending' : 'Mark as completed'}
                >
                  <CheckCircle2 className="w-5 h-5" />
                </button>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="p-1 rounded-lg bg-slate-100">
                      {getCategoryIcon(rem.category)}
                    </span>
                    <h3 className={`font-bold text-sm sm:text-base ${rem.completed ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                      {rem.title}
                    </h3>
                    {pet && (
                      <span className="text-[11px] font-semibold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-100">
                        {pet.species === 'dog' ? '🐶' : '🐱'} {pet.name}
                      </span>
                    )}
                  </div>

                  {rem.notes && (
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {rem.notes}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto self-end sm:self-auto border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Due: {rem.dueDate}</span>
                </div>

                <button
                  onClick={() => deleteReminder(rem.id)}
                  className="p-1.5 text-slate-300 hover:text-red-600 rounded-lg transition"
                  title="Delete reminder"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {reminders.length === 0 && !isAdding && (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
          <Calendar className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="font-bold text-slate-800 text-lg">No Reminders Scheduled</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Stay ahead of rabies shots, monthly flea chews, and vet wellness checks.
          </p>
          <button
            onClick={() => setIsAdding(true)}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs"
          >
            Add First Reminder
          </button>
        </div>
      )}
    </div>
  );
};
