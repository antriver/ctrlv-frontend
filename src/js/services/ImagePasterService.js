app.service(
    'ImagePasterService',
    function($state, AuthService) {

        var messages = {};

        /**
         * Add listeners for events that ImagePaster broadcasts.
         */
        $(document).on('ctrlvuploadstart', function (e) {
            $('.upload-status').addClass('out');
            $('#upload-loading').removeClass('out');

            messages[e.id] = alertSpinner("Uploading image...");
        });

        $(document).on('ctrlvuploadcomplete', function (e) {
            $('.upload-status').addClass('out');
            $('#upload-complete').removeClass('out');
            var viewUrl = e.image.url;
            var imageUrl = e.image.image.url;
            $('#view-btn').attr('href', viewUrl);
            $('#uploader').css('background-image', 'url(' + imageUrl + ')');

            if (messages.hasOwnProperty(e.id)) {
                messages[e.id].update({
                    type: "success",
                    message: "Image uploaded! " + e.image.url
                })
            } else {
                alertSuccess("Image uploaded! " + e.image.url, true);
            }

            $state.go('image', {imageId: e.image.imageId});

        });

        $(document).on('ctrlvuploaderror', function (e) {
            $('.upload-status').addClass('out');
            $('#upload-error').removeClass('out').find('p').text(e.message);

            if (messages.hasOwnProperty(e.id)) {
                messages[e.id].update({
                    type: "error",
                    message: e.message
                })
            } else {
                alertError(e.message, true);
            }

        });

        $(document).on('keyup', function (e) {
            // Highlighting keys when pressing
            if (e.which == 91 || e.which === 224) { // cmd
                $('.btn-cmd').removeClass('active');
            } else if (e.which == 17) { // ctrl
                $('.btn-ctrl').removeClass('active');
            } else if (e.which == 86) { // v
                $('.btn-v').removeClass('active');
            }
        });

        $(document).on('keydown', function (e) {
            // Highlighting keys when pressing
            if (e.which == 91 || e.which === 224) { // cmd (91 in
                $('.btn-cmd').addClass('active');
            } else if (e.which == 17) { // ctrl
                $('.btn-ctrl').addClass('active');
            } else if (e.which == 86) { // v
                $('.btn-v').addClass('active');
            }
        });

        var getImageUploadUrl = function() {
            var url = apiUrl + 'images';

            var sessionKey;
            if (sessionKey = AuthService.getSessionKey()) {
                url += '?sessionKey=' + sessionKey;
            }
            return url;
        };

        return new ImagePaster(getImageUploadUrl);
    }
);
