import React, { useEffect } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';

const UpdateScoreModal = ({ rank, percentile, correctAns, onClose, onSave }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue('rank', rank);
    setValue('percentile', percentile);
    setValue('currentScore', correctAns);
  }, [rank, percentile, correctAns, setValue]);

  const onSubmit = (data) => {
    const { rank, percentile, currentScore } = data;
    onSave({
      rank: Number(rank),
      percentile: Number(percentile),
      currentScore: Number(currentScore),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 text-sm p-4">
      <div className="bg-white text-black rounded-xl p-5 sm:p-6 w-full max-w-lg shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-xl">Update Scores</h3>
          <Image src="/html_logo.png" alt="HTML Logo" width={27} height={27} />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Fields */}
          {[
            {
              id: 1,
              label: 'Rank',
              name: 'rank',
              placeholder: 'Rank',
              validate: (value) => !isNaN(value) || 'Should be a number',
            },
            {
              id: 2,
              label: 'Percentile',
              name: 'percentile',
              placeholder: 'Percentile',
              validate: (value) => {
                const num = Number(value);
                if (isNaN(num)) return 'Should be a number';
                if (num < 1 || num > 100) return 'Percentile should be between 1 and 100';
                return true;
              },
            },
            {
              id: 3,
              label: 'Current score (out of 15)',
              name: 'currentScore',
              placeholder: 'Current Score',
              validate: (value) => {
                const num = Number(value);
                if (isNaN(num)) return 'Should be a number';
                if (num > 15) return 'Score cannot be greater than 15';
                return true;
              },
            },
          ].map((field) => (
            <div key={field.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-900 text-white font-semibold">
                {field.id}
              </div>
              <label className="sm:w-60 font-medium">
                Update your <strong>{field.label}</strong>
              </label>
              <div className="flex-1 w-full">
                <input
                  type="text"
                  placeholder={field.placeholder}
                  {...register(field.name, {
                    required: `${field.label} is required`,
                    validate: field.validate,
                  })}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
                {errors[field.name] && (
                  <p className="text-red-500 text-sm mt-1">{errors[field.name].message}</p>
                )}
              </div>
            </div>
          ))}

          {/* Buttons */}
          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white border border-blue-900 hover:border-blue-950 text-black rounded cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-900 hover:bg-blue-950 font-semibold text-white rounded cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateScoreModal;
