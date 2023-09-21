# wp-focal-point

Brings focal point settings to images in the Wordpress Media Library

# Usage

Open the focal point view by clicking the "Save focal point" in the image settings. Click anywhere on the image to select coordinates and click Save.
To load the coordinates in your theme, use `wp_fp_get_values($image_id)`. Wp Focal Point does not crop images, therefore as of right now it's not possible to use it with the core image block.