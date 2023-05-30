(function () {
  function eventListeners() {
    document.addEventListener('click', maybeOpenModal);
  }

  function closeModal() {
    document.getElementById('cpt_Modal').remove();
  }

  function maybeOpenModal(e) {
    const imageId = e.target.getAttribute('data-wp-focal-point');
    if (imageId) {
      const image = wp.media.attachment(imageId);
      if (!image) {
        return;
      }
      let modalHtml = '';
      modalHtml+= '<div id="cpt_Modal" class="cpt_Modal">';
      modalHtml+= '<div class="cpt_ModalDialog" role="dialog" aria-label="Set focal point">';
      modalHtml+= '<button type="button" class="cpt_ModalClose" aria-label="close">&times;</button>';
      modalHtml+= '<div class="cpt_ModalHeader"><div class="cpt_ModalTitle">Set focal point</div></div>';
      modalHtml+= '<div class="cpt_ModalContent" id="cpt_crop_editor">';

      modalHtml += '<figure class="wp-focal-point-image"><img src="' + image.attributes.url + '" /></figure>';

      modalHtml+= '</div>';//end cpt_ModalContent
      modalHtml+= '</div>';//end cpt_ModalDialog
      modalHtml+= '</div>';//end cpt_Modal;

      document.body.insertAdjacentHTML('beforeend', modalHtml);
      document.querySelector('.cpt_ModalClose').addEventListener('click', closeModal);
    }
  }

  eventListeners();
})();
