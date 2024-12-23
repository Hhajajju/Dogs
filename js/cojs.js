
document.getElementById('copyButton').addEventListener('click', function() {

  var copyText = document.getElementById('link');

  copyText.select();
  copyText.setSelectionRange(0, 99999); 
  

  document.execCommand('copy');
  
 
 
});
