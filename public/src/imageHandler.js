// select Img to article from Pop-up

$('document').ready(function(){
  $('.selectImage').click(function(ev){
    ev.preventDefault();
    $('.selectImage').removeClass('selectedItem');
    $(this).addClass('selectedItem');

    let urlImg = $('.selectedItem').find('img');
    urlImg = $(urlImg).attr('src');

    $('.cardArticleImg .img-thumbnail').attr('src', urlImg);

    let selectedItemInput = $(this).attr('attr');
    $('.idImg').val(selectedItemInput);
  })
});

// init img upload with Preview

const upload = new FileUploadWithPreview('myUniqueUploadId');

// init Quill editor

let toolbarOptions = [
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  ['bold', 'italic', 'underline', 'strike', 'link', 'image', 'video'],        // toggled buttons
  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  [{ 'color': [] }],          // dropdown with defaults from theme
  [{ 'align': [] }],
  ['blockquote', 'code-block'],
  ['clean']                                         // remove formatting button
];

let quill = new Quill('.editor', {
 bounds: '#quill-editor',
 modules: {
   toolbar: toolbarOptions
 },
 placeholder: 'Free Write...',
 theme: 'snow'
});

function selectLocalImage() {
 const input = document.createElement('input');
 input.setAttribute('type', 'file');
 input.click();

 input.onchange = () => {
   const file = input.files[0];

   if (/^image\//.test(file.type)) {
     saveToServer(file);
   } else {
     console.warn('You could only upload images.');
   }
 };
}

function saveToServer(file) {
  const fd = new FormData();
  fd.append('image', file);

  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/mel-admin/media?editor=true', true);

  xhr.onload = () => {
   if (xhr.status === 200) {
     const url = JSON.parse(xhr.responseText).data;
     insertToEditor(url);
   }
  };
  xhr.send(fd);
}

function insertToEditor(url) {
 // push image url to rich editor.
 const range = quill.getSelection();
 quill.insertEmbed(range.index, 'image', `${url}`);
}

// quill editor add image handler
quill.getModule('toolbar').addHandler('image', () => {
 selectLocalImage();
});


quill.on('text-change', function() {
  let value = quill.root.innerHTML;
  $('#editor').val(value);
});

$('.saveChanges').click(function(){
  quill.pasteHTML($('#editor').val());
});
