"use client";

import AssetUploader from "@/components/booking/AssetUploader";
import ChoiceGroup from "@/components/booking/ChoiceGroup";
import FormSection from "@/components/booking/FormSection";
import Input from "@/components/ui/Input";
import {
  AD_LANGUAGE_OPTIONS,
  ASSET_MEDIA_OPTIONS,
  CONTENT_READY_OPTIONS,
  GOAL_OPTIONS,
} from "@/lib/constants/booking";
import { UPLOAD_LIMITS } from "@/lib/constants/uploads";

export default function StepAssets({
  form,
  errors,
  onChange,
  onFieldChange,
  onUploadBusyChange,
}) {
  const needsAssets = form.hasContentReady === "yes";
  const mediaType = form.assetMediaType === "video" ? "video" : "images";

  const handleMediaTypeChange = (value) => {
    onFieldChange("assetMediaType")(value);
    if (value === "images") {
      onFieldChange("videoAsset")(null);
    } else {
      onFieldChange("imageAssets")([]);
    }
  };

  return (
    <div className="mt-6 space-y-6">
      <FormSection title="Content submission">
        <ChoiceGroup
          label="Do you have creatives ready?"
          name="hasContentReady"
          options={CONTENT_READY_OPTIONS}
          value={form.hasContentReady}
          onChange={onFieldChange("hasContentReady")}
          error={errors.hasContentReady}
        />
        <ChoiceGroup
          label="Preferred language for the ad"
          name="adLanguage"
          options={AD_LANGUAGE_OPTIONS}
          value={form.adLanguage}
          onChange={onFieldChange("adLanguage")}
          error={errors.adLanguage}
        />
      </FormSection>

      <FormSection title="Upload campaign assets">
        {needsAssets ? (
          <p className="font-body text-sm text-neutral-gray">
            Choose images or video — you only need one. Your files are transferred
            securely and attached to this booking.
          </p>
        ) : (
          <p className="font-body text-sm text-neutral-gray">
            Uploads are optional if you need us to create creatives. You can still
            add a brief or reference link below.
          </p>
        )}

        <ChoiceGroup
          label="What will you upload?"
          name="assetMediaType"
          options={ASSET_MEDIA_OPTIONS}
          value={mediaType}
          onChange={handleMediaTypeChange}
        />

        {mediaType === "images" ? (
          <AssetUploader
            label="Campaign images"
            hint="Up to 8 images for ads and creatives"
            accept={UPLOAD_LIMITS.images.accept}
            allowedFormats={UPLOAD_LIMITS.images.allowedFormats}
            maxFiles={UPLOAD_LIMITS.images.maxFiles}
            maxSizeBytes={UPLOAD_LIMITS.images.maxSizeBytes}
            resourceType={UPLOAD_LIMITS.images.resourceType}
            folder={UPLOAD_LIMITS.images.folder}
            multiple
            value={form.imageAssets}
            onChange={onFieldChange("imageAssets")}
            onBusyChange={onUploadBusyChange}
          />
        ) : (
          <AssetUploader
            label="Campaign video"
            hint="MP4, MOV, or WEBM"
            accept={UPLOAD_LIMITS.video.accept}
            allowedFormats={UPLOAD_LIMITS.video.allowedFormats}
            maxFiles={UPLOAD_LIMITS.video.maxFiles}
            maxSizeBytes={UPLOAD_LIMITS.video.maxSizeBytes}
            resourceType={UPLOAD_LIMITS.video.resourceType}
            folder={UPLOAD_LIMITS.video.folder}
            value={form.videoAsset}
            onChange={onFieldChange("videoAsset")}
            onBusyChange={onUploadBusyChange}
          />
        )}

        <Input
          id="externalContentUrl"
          label="Or share an external link (optional)"
          placeholder="Google Drive / Dropbox / WeTransfer"
          value={form.externalContentUrl}
          onChange={onChange("externalContentUrl")}
        />

        {errors.assets ? (
          <p className="font-body text-caption text-error">{errors.assets}</p>
        ) : null}
      </FormSection>

      <FormSection title="Campaign goals">
        <ChoiceGroup
          label="What are your primary goals?"
          name="goals"
          options={GOAL_OPTIONS}
          values={form.goals}
          onChange={onFieldChange("goals")}
          multiple
          error={errors.goals}
        />
      </FormSection>
    </div>
  );
}
