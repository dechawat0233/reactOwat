<footer class="main-footer">
   © สงวนลิขสิทธิ์ โดย บริษัท โอวาท โปร แอนด์ ควิก จำกัด
</footer>
</div>
<!-- jQuery -->

<script src="assets/js/jquery.min.js"></script>
<!-- Bootstrap 4 -->
<!-- Select2 -->
<script src="assets/js/select2.full.min.js"></script>
<!-- Bootstrap4 Duallistbox -->
<!-- InputMask -->
<script src="assets/js/moment.min.js"></script>
<script src="assets/js/jquery.inputmask.min.js"></script>
<!-- date-range-picker -->
<script src="assets/js/daterangepicker.js"></script>
<!-- bootstrap color picker -->
<!-- Tempusdominus Bootstrap 4 -->

<script src="assets/js/tempusdominus-bootstrap-4.min.js"></script>
<script src="assets/js/bootstrap.bundle.min.js"></script>
<!-- Bootstrap Switch -->

<!-- AdminLTE App -->
<script src="assets/js/adminlte.min.js"></script>
<script>
$('#myModal').on('shown.bs.modal', function () {
  
  $("#myInput").modal("show");
})
</script>
<script>
  $(function () {
    //Datemask dd/mm/yyyy
    $('#datemask').inputmask('dd/mm/yyyy', { 'placeholder': 'dd/mm/yyyy' })
    //Datemask2 mm/dd/yyyy
    $('#datemask2').inputmask('dd/mm/yyyy', { 'placeholder': 'dd/mm/yyyy' })
    //Money Euro
    $('[data-mask]').inputmask()

    //Date picker
    $('#reservationdate').datetimepicker({
        format: 'L'
    });
	 $('#reservationdate2').datetimepicker({
        format: 'L'
    });
	$('#reservationdate3').datetimepicker({
        format: 'L'
    });
  })
</script>
<script>
jQuery(function($) {
  var path = window.location.href; 
  // because the 'href' property of the DOM element is the absolute path
  $('ul li a').each(function() {
    if (this.href === path) {
      $(this).addClass('active');
    }
  });
});
</script>
<script>
var form = $('#myForm'),
    checkbox = $('#no'),
    checkbox1 = $('#no1'),
    chShipBlock1 = $('#choose_hospital1'),
    chShipBlock = $('#choose_hospital');
    
chShipBlock.hide();
chShipBlock1.hide();
    
checkbox.on('click', function() {
    if($(this).is(':checked')) {
      chShipBlock.show();
      chShipBlock.find('input').attr('required', true);
    } else {
      chShipBlock.hide();
      chShipBlock.find('input').attr('required', false);
    }
})
checkbox1.on('click', function() {
    if($(this).is(':checked')) {
      chShipBlock1.show();
      chShipBlock1.find('input').attr('required', true);
    } else {
      chShipBlock1.hide();
      chShipBlock1.find('input').attr('required', false);
    }
})
</script>
<script>
    var checkboxes = $('#accept'),
        submitButt = $('#apply');

    checkboxes.click(function() {
        submitButt.attr("disabled", !checkboxes.is(":checked"));
    });
</script>

</body>
</html>



