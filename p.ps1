git add . -A

$message = "Auto commit at " + (Get-Date -Format g)
Write-Host $message
git commit -m  $message
# git push