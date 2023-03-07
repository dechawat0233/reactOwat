<?php include("include/header.php");?>
<div class="wrapper">
	<div class="Form_login">
		<div class="login-page inner_login">
			<div class="login-box">
                <div class="logo-login"><img src="assets/images/logo-xl.png" alt="" class=""></div>
				<div class="title-login">
					<h2>ระบบบริหารทรัพยากรบุคคล</h2>
				</div>
                <div class="txt-login">
                    <i class="fas fa-user-circle"></i> เข้าสู่ระบบ 
                </div>
				<form action="dashboard.php" method="post">
					<div class="form-group">
						<label for="">ชื่อผู้ใช้หรืออีเมล์  <span class="txt-red">*</span></label>
						<input type="" class="form-control" id="" placeholder="ชื่อผู้ใช้หรืออีเมล์">
					</div>
					<div class="form-group">
						<label for="">รหัสผ่าน  <span class="txt-red">*</span></label>
						<input type="" class="form-control" id="" placeholder="รหัสผ่าน ">
					</div>
                    <div class="clr">
						<button type="submit" class="btn-login btn-block">เข้าสู่ระบบ <img src="assets/images/right-to-bracket-solid.png" width="15"></button>
					</div>
					<div class="forgotpassword"><a href=""><i class="fas fa-unlock-alt"></i> ลืมรหัสผ่าน ?</a><a href=""><i class="fas fa-user-plus"></i> ลงทะเบียนใหม่</a></div>
				</form>
			</div><!--login-box-->
            <div class="Copyright"><p>Copyright © 2022 สงวนลิขสิทธิ์ โดย บริษัท โอวาท โปร แอนด์ ควิก จำกัด</p></div>
		</div><!--login-page-->
	</div><!--Form_login-->
</div><!--wrapper-->

