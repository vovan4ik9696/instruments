<?php
  use PHPMailer\PHPMailer\PHPMailer;
  use PHPMailer\PHPMailer\Exception;

  require 'PHPMailer-6.4.0/src/Exception.php';
  require 'PHPMailer-6.4.0/src/PHPMailer.php';

  $mail = new PHPMailer(true);
  $mail->CharSet = 'UTF-8';
  $mail->setLanguage('ru', 'phpmailer/language/');
  $mail->isHTML(true);

  $mail->setFrom('info@instruments.ru', 'Сайт инструмеентов');
  $mail->addAddress('vovaeremaa@yandex.ru');
  $mail->Subject = 'Новая заявка';

  $body = '<h1>Новое письмо</h1>';

  if(trim(!empty($_POST['name']))) {
    $body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
  }

  if(trim(!empty($_POST['phone']))) {
    $body.='<p><strong>Имя:</strong> '.$_POST['phone'].'</p>';
  }

  if(trim(!empty($_POST['mail']))) {
    $body.='<p><strong>Имя:</strong> '.$_POST['mail'].'</p>';
  }

  if(trim(!empty($_POST['message']))) {
    $body.='<p><strong>Имя:</strong> '.$_POST['message'].'</p>';
  }

  $mail->Body = $body;

  if(!$mail->send()) {
    $message = 'Ошибка';
  } else {
    $message = 'Данные отправлены!';
  }

  $response = ['message' => $message];

  header('Content-type: application/json');
  echo json_encode($response);
?>