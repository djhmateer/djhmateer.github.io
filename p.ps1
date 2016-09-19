git add . -A
$message = "Auto commit at " + (Get-Date -Format g)
git commit -m  $message
git push