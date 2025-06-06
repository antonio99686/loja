<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css">
    <link rel="stylesheet" type="text/css" href="css/style.css">
    <title>Login</title>
</head>

<body>

<?php
session_start();
require_once "../crud/function/conexao.php";
$conexao = conn();

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['cpf'], $_POST['senha'])) {
    $cpf = $_POST['cpf'];
    $senha = $_POST['senha'];

    // Query para verificar as credenciais do usuário
    $sql = "SELECT id_usuario, nome, perfil_img FROM usuario WHERE cpf = '$cpf' AND senha = '$senha'";
    $result = executarSQL($conexao, $sql);

    if (mysqli_num_rows($result) > 0) {
        $usuario = mysqli_fetch_assoc($result);
        $_SESSION['id_usuario'] = $usuario['id_usuario'];
        $_SESSION['nome'] = $usuario['nome'];
        $_SESSION['perfil_img'] = $usuario['perfil_img'];

        echo "<script>
            Swal.fire({
                icon: 'success',
                title: 'Bem-vindo!',
                text: 'Login realizado com sucesso!',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                window.location.href = '../admin/index.php';
            });
        </script>";
    } else {
        echo "<script>
            Swal.fire({
                icon: 'error',
                title: 'Erro!',
                text: 'E-mail ou senha incorretos.',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                window.location.href = '../index.html';
            });
        </script>";
    }
} else {
    echo "<script>
        Swal.fire({
            icon: 'warning',
            title: 'Atenção!',
            text: 'Por favor, preencha todos os campos.',
            showConfirmButton: false,
            timer: 1500
        }).then(() => {
            window.location.href = '../index.html';
        });
    </script>";
}
?>



</body>
</html>