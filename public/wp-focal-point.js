(function () {
  function eventListeners() {
    document.addEventListener('click', maybeOpenModal);
  }

  function closeModal() {
    document.getElementById('fpt_Modal').remove();
  }

  function maybeOpenModal(e) {
    const imageId = e.target.getAttribute('data-wp-focal-point');
    if (imageId) {
      const image = wp.media.attachment(imageId);
      if (!image) {
        return;
      }
      let modalHtml = '';
      modalHtml+= '<div id="fpt_Modal" class="fpt_Modal">';
      modalHtml+= '<div class="fpt_ModalDialog" role="dialog" aria-label="Set focal point">';
      modalHtml+= '<div class="media-frame-title"><h1>Attachment details</h1>';
      modalHtml+= '<button type="button" class="fpt_ModalClose media-modal-close" aria-label="close">&times;</button></div>';
      modalHtml+= '<div class="fpt_ModalContent" id="fpt_crop_editor">';
      modalHtml+= '<div class="fpt_ModalColLeft">';
      modalHtml+= '<div class="fpt_ModalHeader"><div class="fpt_ModalTitle">Set focal point</div></div>';

      // image
      modalHtml += '<figure class="wp-focal-point-image"><div class="pos-wrapper"><p class="pos">X: <span class="posX">50</span>%</p><p class="pos">Y: <span class="posY">50</span>%</p>';
      modalHtml += '</div><div class="fpt_cursor"></div><img src="' + image.attributes.url + '" /></figure>';
      modalHtml += '<button class="button">Save</button>';
      modalHtml+= '</div>'; // modalColLeft

      // examples
      modalHtml+= '<div class="fpt_ModalColRight">';
      modalHtml+= '<div class="fpt_ModalTitle">Examples of crops</div>';

      modalHtml+= '<div class="fpt-preview-wrap">';
      modalHtml += '<figure class="fpt-preview fpt-preview-square"><img src="' + image.attributes.url + '" /></figure>';
      modalHtml += '<figure class="fpt-preview fpt-preview-wide"><img src="' + image.attributes.url + '" /></figure>';
      modalHtml += '<figure class="fpt-preview fpt-preview-portrait"><img src="' + image.attributes.url + '" /></figure>';
      modalHtml+= '</div>';

      modalHtml+= '</div>'; // modalColRight

      modalHtml+= '</div>';
      modalHtml+= '</div>';
      modalHtml+= '</div>';

      document.body.insertAdjacentHTML('beforeend', modalHtml);
      // document.body.appendChild(modalHtml);
      document.querySelector('.fpt_ModalClose').addEventListener('click', closeModal);
      document.querySelector('.wp-focal-point-image').addEventListener('click', function(e) {
        setFocalPoint(e);
      });
    }
  }

  function setFocalPoint (e) {
    const imageEl = document.querySelector('.wp-focal-point-image');
    const imageHeight = imageEl.offsetHeight;
    const imageWidth = imageEl.offsetWidth;
    const cursor = document.querySelector('.fpt_cursor');
    const previewEls = document.querySelectorAll('.fpt-preview img');
    let rect = imageEl.getBoundingClientRect();
    let posX;
    let posY;

    posX = Math.round(((e.pageX - rect.left) / imageWidth) * 100);
    posY = Math.round(((e.pageY - rect.top) / imageHeight) * 100);

    document.querySelector('.posX').innerHTML = posX;
    document.querySelector('.posY').innerHTML = posY;
    cursor.style.top = posY + '%';
    cursor.style.left = posX + '%';

    previewEls.forEach(el => el.style.objectPosition = `${posX}% ${posY}%`);
  }

  eventListeners();
})();
