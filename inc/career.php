<?php
/**
* Simple example script using PHPMailer with exceptions enabled
* @package phpmailer
* @version $Id$
*/
if(file_exists("class.phpmailer.php")){
	require 'class.phpmailer.php';

try {
    $mail = new PHPMailer(true); //New instance, with exceptions enabled

    $to = "muthukrish@abileweb.com";
	$mail->AddAddress($to);
	$mail->From       = $_POST['femail'];
    $mail->FromName   = $_POST['career_name'];
	$mail->Subject  = "Email Test";

	$body             = "<table>
	                         <tr><th colspan='2'>This Sample Mail</th></tr>
							 <tr><td style='font-weight:bold'>Name :</td><td>".$_POST['career_name']."</td></tr>
							 <tr><td style='font-weight:bold'>From :</td><td>".$_POST['femail']."</td></tr>
							 <tr><td style='font-weight:bold'>Age :</td><td>".$_POST['career_age']."</td></tr>
							 <tr><td style='font-weight:bold'>City :</td><td>".$_POST['career_city']."</td></tr>
							 <tr><td style='font-weight:bold'>Phone :</td><td>".$_POST['career_phone']."</td></tr>
							 <tr><td style='font-weight:bold'>Salary :</td><td>".$_POST['career_salary']."</td></tr>
							 <tr><td style='font-weight:bold'>Experience :</td><td>".$_POST['career_experience']."</td></tr>
							 <tr><td style='font-weight:bold'>Website :</td><td>".$_POST['career_website']."</td></tr>
							 <tr><td style='font-weight:bold'>Comment :</td><td>".$_POST['career_comment']."</td></tr>
	                     <table>";
	$body             = preg_replace('/\\\\/','', $body); //Strip backslashes
	$mail->MsgHTML($body);

	$mail->IsSMTP();                           // tell the class to use SMTP
	$mail->SMTPAuth   = true;                  // enable SMTP authentication
	$mail->Port       = 25;                    // set the SMTP server port
	//$mail->Host       = "mail.yourdomain.com"; // SMTP server
	//$mail->Username   = "name@domain.com";     // SMTP server username
	//$mail->Password   = "password";            // SMTP server password

	$mail->IsSendmail();  // tell the class to use Sendmail
	$mail->AddReplyTo("muthukrish@abileweb.com");
	$mail->AltBody    = "To view the message, please use an HTML compatible email viewer!"; // optional, comment out and test
	$mail->WordWrap   = 80; // set word wrap
	if( isset( $_FILES['careerfile-0'] ) && file_exists($_FILES['careerfile-0']['tmp_name']) ){
		$mail->AddAttachment($_FILES['careerfile-0']['tmp_name'],$_FILES['careerfile-0']['name']);		
	}//file exists
	
	$mail->IsHTML(true); // send as HTML
	
	if( $mail->Send()){
		$msg_array = array( 'status' => 'true', 'data' => '<span class="send-true" style="color: #00dd63;">Your email was sent!</span>' );		
		echo json_encode($msg_array);
		 
	}else{
		$msg_array = array( 'status' => 'true', 'data' => '<span style="color: red;"> Your Email was not sent. Resubmit form again Please..!</span>' );   	echo json_encode($msg_array);
		
	}
		
} catch (phpmailerException $e) {
	echo json_encode($e->errorMessage());
}
}//if file exists
else{
	echo "File Pbm.";
}

?>
