Messenger.options = {
    extraClasses: 'messenger-fixed messenger-on-bottom messenger-on-middle',
    theme: 'ctrlv'
};

function alertSuccess(message, keep)
{
    return Messenger().post({
        message: message,
        type: 'success',
        showCloseButton: true,
        hideAfter: keep ? 0 : 3
    });
}

function alertInfo(message)
{
    return Messenger().post({
        message: message,
        type: 'info',
        showCloseButton: true,
        hideAfter: 3
    });
}

function alertSpinner(message)
{
    return Messenger().post({
        message: message + '<i class="spinner-loading"></i>',
        type: 'spinner',
        hideAfter: 0
    });
}

function alertError(message, keep)
{
    return Messenger().post({
        message: message,
        type: 'error',
        showCloseButton: true,
        hideAfter: keep ? 0 : 5
    });
}

