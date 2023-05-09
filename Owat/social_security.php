<?php include("include/header.php");?>
<body class="hold-transition sidebar-mini">
<div class="wrapper">
<!-- Navbar -->
<?php include("include/top.php");?>
<!-- /.navbar -->
<!-- Main Sidebar Container -->
<?php include("include/aside_left.php");?>
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <ol class="breadcrumb">
		<li class="breadcrumb-item"><i class="fas fa-home"></i> <a href="index.php">หน้าหลัก</a></li>
		<li class="breadcrumb-item"><a href="#"> ระบบบริหารจัดการข้อมูล</a></li>
		<li class="breadcrumb-item active">ข้อมูลเงินเดือน</li>
	</ol>
	<div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
           <h1 class="m-0"><i class="far fa-arrow-alt-circle-right"></i> ประกันสังคม</h1>
        </div>
      </div>
    </div>
    <!-- /.content-header -->
    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
       <form action="">
       <h2 class="title">รายละเอียดประกันสังคม</h2>
       <section class="Frame">
			<div class="form-group row">
				<label class="col-md-3 ">หักประกันสังคม</label>
				<div class="col-md-5">
					<div class="icheck-primary d-inline">
						<input type="radio" id="radioPrimary1" name="r1" checked=""> หักประกันสังคม
					</div>
					<div class="icheck-primary d-inline">
						<input type="radio" id="radioPrimary2" name="r1"> ไม่หักประกันสังคม
					</div>
				</div>
			</div>
			<div class="form-group row">
				<label class="col-md-3 col-form-label">วิธีหัก</label>
				<div class="col-md-5">
					<select class="form-control">
							<option>พนักงานจ่ายเอง</option>
							<option>option 2</option>
							<option>option 3</option>
							<option>option 4</option>
							<option>option 5</option>
					</select>
				</div>
			</div>
		   <div class="form-group row">
				<label class="col-md-3 col-form-label">วันที่เริ่มงาน</label>
				<div class="col-md-5">
					<div class="input-group date" id="reservationdate" data-target-input="nearest">
						<input type="text" class="form-control datetimepicker-input" data-target="#reservationdate">
						<div class="input-group-append" data-target="#reservationdate" data-toggle="datetimepicker">
							<div class="input-group-text"><i class="fa fa-calendar-alt"></i></div>
						</div>
					</div>
				</div>
			</div>
		   <div class="form-group row">
				<label class="col-md-3 col-form-label">เลขที่บัตรประชาชน</label>
				<div class="col-md-5">
					<input type="" class="form-control" id="" placeholder="เลขที่บัตรประชาชน">
				</div>
			</div>
		   <div class="form-group row">
				<label class="col-md-3 col-form-label">คำนำหน้าชื่อ</label>
				<div class="col-md-5">
					<input type="" class="form-control" id="" placeholder="คำนำหน้าชื่อ">
				</div>
			</div>
	   </section><!--Frame-->
	   <h2 class="title">รหัสสถานรักษาพยาบาลที่พนักงานต้องการ</h2>
       <section class="Frame">
              <div class="form-group row">
					<label class="col-md-3 col-form-label">ชื่อสถานรักษาพยาลบาลปัจจุบัน</label>
					<div class="col-md-5">
						 <select class="form-control">
								  <option>ยังไม่ได้ระบุ</option>
								  <option>option 2</option>
								  <option>option 3</option>
								  <option>option 4</option>
								  <option>option 5</option>
				         </select>
					</div>
              </div>
              <div class="form-group row">
					<label class="col-md-3 col-form-label">ต้องการเลือกลำดับที่ 1</label>
					<div class="col-md-5">
						 <input type="" class="form-control" id="" placeholder="">
					</div>
              </div>
              <div class="form-group row">
					<label class="col-md-3 col-form-label">ต้องการเลือกลำดับที่ 2</label>
					<div class="col-md-5">
						 <input type="" class="form-control" id="" placeholder="">
					</div>
              </div>
		       <div class="form-group row">
					<label class="col-md-3 col-form-label">ต้องการเลือกลำดับที่ 3</label>
					<div class="col-md-5">
						 <input type="" class="form-control" id="" placeholder="">
					</div>
              </div>
	   </section><!--Frame-->
	   <h2 class="title">เฉพาะกรณีพนักงานและบริษัทสมทบอัตราต่างกัน</h2>
       <section class="Frame">
              <div class="form-group row">
					<label class="col-md-3 col-form-label">อัตราพนักงานหักเข้ากองทุนประกันสังคม</label>
					<div class="col-md-5">
						 <input type="" class="form-control" id="" placeholder="">
					</div>
				    <label class="col-form-label">%</label>
              </div>
              <div class="form-group row">
					<label class="col-md-3 col-form-label">อัตราบริษัทสมทบกองทุนประกันสังคม</label>
					<div class="col-md-5">
						 <input type="" class="form-control" id="" placeholder="">
					</div>
				    <label class="col-form-label">%</label>
              </div>
	   </section><!--Frame-->
	   <h2 class="title">เฉพาะกรณีไม่ได้เป็นพนักงานตั้งแต่ต้นปี</h2>
       <section class="Frame">
              <div class="form-group row">
					<label class="col-md-3 col-form-label">ยอดเงินประกันสังคมถูกหักก่อนเป็นพนักงาน</label>
					<div class="col-md-5">
						 <input type="" class="form-control" id="" placeholder="">
					</div>
              </div>
	   </section><!--Frame-->
	   <h2 class="title">เฉพาะกรณีที่ไม่ได้ใช้โปรแกรมคำนวณเงินเดือนตั้งแต่ต้นปี</h2>
       <section class="Frame">
              <div class="form-group row">
					<label class="col-md-3 col-form-label">ค่าจ้างก่อนใช้โปรแกรม</label>
					<div class="col-md-5">
						 <input type="" class="form-control" id="" placeholder="">
					</div>
				    <label class="col-form-label">%</label>
              </div>
              <div class="form-group row">
					<label class="col-md-3 col-form-label">ยอดเงินประกันสังคมถูกหักก่อนใช้โปรแกรม</label>
					<div class="col-md-5">
						 <input type="" class="form-control" id="" placeholder="">
					</div>
				    <label class="col-form-label">%</label>
              </div>
		      <div class="form-group row">
					<label class="col-md-3 col-form-label">ยอดเงินประกันสังคมบริษัทสมทบก่อนใช้โปรแกรม</label>
					<div class="col-md-5">
						 <input type="" class="form-control" id="" placeholder="">
					</div>
				    <label class="col-form-label">%</label>
              </div>
	   </section><!--Frame-->
	   <div class="line_btn">
			<button  type="submit" class="btn b_save"><i class="nav-icon fas fa-save"></i> &nbsp;บันทึก</button>
			<button type="reset" class="btn clean"><i class="far fa-window-close"></i> &nbsp;ยกเลิก</button>
	   </div>
       </form>
      </div><!-- /.container-fluid -->
    </section><!-- /.content -->
 </div>
<?php include("include/footer.php");?>
