<?php
	require_once "./module/emailClass.php";

	// 如果为空！
	if (empty($_POST['name']) || empty($_POST['addr']) || empty($_POST['content'])) {
		echo "没有数据，禁止访问！";
		exit;
	}
	// 邮件配置
	$config= array(
		'server'=>'smtp.126.com',   				//SMTP服务器
		'serverport'=>'25',							//SMTP服务器端口
		'mailfrom'=> 'runfa_c@126.com',				//SMTP服务器的用户邮箱  
		'emailto'=>'runfa_c@126.com',				//发送给谁			
		'user'=>'runfa_c@126.com',					//SMTP服务器的用户帐号
		'pwd'=>''									//SMTP服务器的用户密码
	);
	// 表单配置
	$inputConfig = array(
		// 格式 
		'name'=>'联系人',
		'addr'=>'主页地址',
		'content'=>'留言信息'
	);
	
	//邮件发送;
	function mailsend($config,$title,$content){	
		$mailtitle = $title;						//邮件主题
		$mailcontent = $content;					//邮件内容
		$mailtype = "HTML";							//邮件格式（HTML/TXT）,TXT为文本邮件
		$smtp = new smtp($config['server'],$config['serverport'],true,$config['user'],$config['pwd']);
		$smtp->debug = false;//是否显示发送的调试信息
		$state = $smtp->sendmail($config['emailto'], $config['mailfrom'], $mailtitle, $mailcontent, $mailtype);
		return $state;
	}
	
	// 构建邮件内容
	foreach($inputConfig as $key =>$value){
		$cont.="$value: ".addslashes(trim($_POST[$key]))."<br/>";
	}
	$state= mailsend($config,$_POST['name'].' 给你留言了!',$cont);
	if($state){
		echo '1';
	}else{
		echo '0';
	}
