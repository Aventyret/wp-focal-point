(function () {
  function eventListeners() {
    document.addEventListener('click', maybeOpenModal);
  }

  function closeModal() {
    document.getElementById('fpt_Modal').remove();
  }

  let imageId = null;
  function maybeOpenModal(e) {
    // const maybeImageId = e.target.getAttribute('data-wp-focal-point');
    if (e.target.getAttribute('data-wp-focal-point')) {
      imageId = e.target.getAttribute('data-wp-focal-point');
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
      modalHtml += '<button class="button save-focal-point">Save</button>';
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
      document.querySelector('.wp-focal-point-image').addEventListener('click', setFocalPoint);
      document.querySelector('.save-focal-point').addEventListener('click', saveFocalPoint);
    }
  }

  let posX = 0.5;
  let posY = 0.5;

  function setFocalPoint (e) {
    const imageEl = document.querySelector('.wp-focal-point-image');
    const imageHeight = imageEl.offsetHeight;
    const imageWidth = imageEl.offsetWidth;
    const cursor = document.querySelector('.fpt_cursor');
    const previewEls = document.querySelectorAll('.fpt-preview img');
    let rect = imageEl.getBoundingClientRect();
    // let posX;
    // let posY;

    posX = (e.pageX - rect.left) / imageWidth;
    posY = (e.pageY - rect.top) / imageHeight;

    const posXPercentage = Math.round(posX * 100);
    const posYPercentage = Math.round(posY * 100);

    document.querySelector('.posX').innerHTML = posXPercentage;
    document.querySelector('.posY').innerHTML = posYPercentage;
    cursor.style.top = posYPercentage + '%';
    cursor.style.left = posXPercentage + '%';

    previewEls.forEach(el => el.style.objectPosition = `${posXPercentage}% ${posYPercentage}%`);
  }

  function saveFocalPoint(e) {
    const ajaxUrl = wp_focal_point_ajax.ajax_url;
    const data = new FormData();

    data.append('action', 'wp_focal_point_save');
    data.append('nonce', wp_focal_point_ajax.nonce);
    data.append('imageId', imageId);
    data.append('posX', posX);
    data.append('posY', posY);

    fetch(ajaxUrl, {
      method: 'POST',
      credentials: 'same-origin',
      body: data
    })
    .then((response) => {
      if(response.ok) {
        console.log('Focal point saved');
      } else {
        console.log('Something went wrong');
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }

  eventListeners();
})();
