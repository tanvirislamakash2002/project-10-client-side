import React from 'react';
import { FaImages } from 'react-icons/fa';

const FinancialAndFinalDetails = ({ props }) => {
  const { register, errors, watch,images, handleImageUpload, removeImage } = props;


  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-base-content">Financial & Final Details</h3>
      <p className="text-text-muted">Set rent, deposit, and review your listing before submission.</p>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Rent */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-base-content">Monthly Rent</span>
            </label>
            <div className="join">
              <span className="join-item bg-base-300 px-4 flex items-center text-text-muted">
                {watch('pricing.currency') || 'USD'}
              </span>
              <input
                type="number"
                placeholder="e.g., 850"
                className="input input-bordered join-item w-full focus:input-primary"
                {...register('pricing.rent', {
                  required: 'Rent is required',
                  min: { value: 1, message: 'Rent must be greater than 0' }
                })}
              />
            </div>
            {errors.pricing?.rent && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.pricing?.rent.message}</span>
              </label>
            )}
          </div>

          {/* Currency */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-base-content">Currency</span>
            </label>
            <select
              className="select select-bordered w-full focus:select-primary"
              {...register('pricing.currency', { required: 'Currency is required' })}
            >
              <option value="USD">USD ($)</option>
              <option value="CAD">CAD (C$)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="AUD">AUD (A$)</option>
            </select>
            {errors.pricing?.currency && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.pricing?.currency.message}</span>
              </label>
            )}
          </div>

          {/* Security Deposit */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-base-content">Security Deposit</span>
            </label>
            <div className="join">
              <span className="join-item bg-base-300 px-4 flex items-center text-text-muted">
                {watch('pricing.currency') || 'USD'}
              </span>
              <input
                type="number"
                placeholder="e.g., 850"
                className="input input-bordered join-item w-full focus:input-primary"
                {...register('pricing.securityDeposit', {
                  required: 'Security deposit is required',
                  min: { value: 0, message: 'Security deposit cannot be negative' }
                })}
              />
            </div>
            {errors.pricing?.securityDeposit && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.pricing?.securityDeposit.message}</span>
              </label>
            )}
          </div>

          {/* Lease Duration */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-base-content">Lease Duration</span>
            </label>
            <select
              className="select select-bordered w-full focus:select-primary"
              {...register('leaseDuration', { required: 'Lease duration is required' })}
            >
              <option value="">Select lease duration</option>
              <option value="Month-to-Month">Month-to-Month</option>
              <option value="3 Months">3 Months</option>
              <option value="6 Months">6 Months</option>
              <option value="1 Year">1 Year</option>
              <option value="2 Years">2 Years</option>
            </select>
            {errors.leaseDuration && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.leaseDuration.message}</span>
              </label>
            )}
          </div>
        </div>

        {/* Utilities Included */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold text-base-content">Utilities</span>
          </label>
          <div className="flex items-center gap-4">
            <label className="cursor-pointer label justify-start gap-3 flex-1">
              <input
                type="radio"
                value={true}
                className="radio radio-primary"
                {...register('pricing.utilitiesIncluded')}
              />
              <span className="label-text text-base-content">
                <span className="font-semibold">Utilities Included</span>
                <span className="block text-sm text-text-muted">Rent includes all utilities (electricity, water, gas, internet)</span>
              </span>
            </label>

            <label className="cursor-pointer label justify-start gap-3 flex-1">
              <input
                type="radio"
                value={false}
                className="radio radio-primary"
                {...register('pricing.utilitiesIncluded')}
              />
              <span className="label-text text-base-content">
                <span className="font-semibold">Utilities Separate</span>
                <span className="block text-sm text-text-muted">Tenant pays utilities separately</span>
              </span>
            </label>
          </div>
        </div>

        {/* Images Upload */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold text-base-content">Property Images</span>
            <span className="label-text-alt text-text-muted">Upload up to 5 images (max 5MB each)</span>
          </label>

          <div className="border-2 border-dashed border-base-300 rounded-lg p-6 text-center hover:border-primary transition-colors">
            <FaImages className="mx-auto text-4xl text-primary mb-3" />
            <p className="text-base-content font-medium mb-2">Add photos of your space</p>
            <p className="text-text-muted text-sm mb-4">
              Show the room, common areas, kitchen, bathroom, and building exterior
            </p>

            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="file-input file-input-bordered file-input-primary w-full max-w-xs mx-auto"
            />

            <div className="mt-4">
              <span className="text-sm text-text-muted">
                {images.length} of 5 images selected
              </span>
            </div>
          </div>

          {/* Image Preview */}
          {images.length > 0 && (
            <div className="mt-4">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {images.map((image, index) => (
                  <div key={image.id} className="relative group">
                    <img
                      src={image.url}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(image.id)}
                      className="absolute -top-2 -right-2 bg-error text-error-content rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Final Summary */}
        <div className="bg-base-200 rounded-lg p-6">
          <h4 className="font-semibold text-base-content mb-4 text-lg">Listing Summary</h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Financial Summary */}
            <div>
              <h5 className="font-semibold text-base-content mb-3">Financial Details</h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-muted">Monthly Rent:</span>
                  <span className="font-semibold text-base-content">
                    {watch('pricing.currency')} {watch('pricing.rent') || '0'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Security Deposit:</span>
                  <span className="font-semibold text-base-content">
                    {watch('pricing.currency')} {watch('pricing.securityDeposit') || '0'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Utilities:</span>
                  <span className="font-semibold text-base-content">
                    {watch('pricing.utilitiesIncluded') ? 'Included' : 'Separate'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Lease Duration:</span>
                  <span className="font-semibold text-base-content">
                    {watch('leaseDuration') || 'Not set'}
                  </span>
                </div>
              </div>
            </div>

            {/* Images Summary */}
            <div>
              <h5 className="font-semibold text-base-content mb-3">Media & Submission</h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-muted">Images Uploaded:</span>
                  <span className="font-semibold text-base-content">
                    {images.length} / 5
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Listing Status:</span>
                  <span className="badge badge-warning">Pending Review</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Submission:</span>
                  <span className="font-semibold text-base-content">
                    Admin approval required
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Final Checklist */}
          <div className="mt-6 p-4 bg-base-100 rounded-lg">
            <h5 className="font-semibold text-base-content mb-3">Ready to Submit?</h5>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded-full ${watch('pricing.rent') ? 'bg-success' : 'bg-base-300'}`}></div>
                <span className={watch('pricing.rent') ? 'text-base-content' : 'text-text-muted'}>
                  Rent and financial details completed
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded-full ${images.length > 0 ? 'bg-success' : 'bg-base-300'}`}></div>
                <span className={images.length > 0 ? 'text-base-content' : 'text-text-muted'}>
                  At least one image uploaded
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded-full ${watch('leaseDuration') ? 'bg-success' : 'bg-base-300'}`}></div>
                <span className={watch('leaseDuration') ? 'text-base-content' : 'text-text-muted'}>
                  Lease duration specified
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialAndFinalDetails;