<?php
add_action( 'admin_enqueue_scripts', function() {
  wp_enqueue_script( 'wp-focal-point', WP_FOCAL_POINT_URI . 'public/wp-focal-point.js', NULL, WP_FOCAL_POINT_VER, true );

  wp_enqueue_style( 'wp-focal-point', WP_FOCAL_POINT_URI . 'public/wp-focal-point.css', NULL, WP_FOCAL_POINT_VER, 'all' );

  wp_localize_script( 'wp-focal-point', 'wp_focal_point_ajax', array(
	'ajax_url' => admin_url( 'admin-ajax.php' ),
	'nonce' => wp_create_nonce( 'wp-focal-point-nonce' )
  ) );
});

add_filter( 'attachment_fields_to_edit', 'Wp_focal_point_fields::edit_focal_point_button', 10, 2);

add_action('wp_ajax_wp_focal_point_save', function() {
	$imageID = intval($_POST['imageId']);
	$posX = floatval($_POST['posX']);
	$posY = floatval($_POST['posY']);

	update_post_meta($imageID, 'wp_focal_point_values', $posX . "," . $posY);
});
