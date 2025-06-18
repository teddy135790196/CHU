Set WshShell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")

' 取得目前 .vbs 的路徑
currentPath = fso.GetParentFolderName(WScript.ScriptFullName)

' 組合出 docs\startAll.bat 的完整路徑
batPath = currentPath & "\docs\startAllend.bat"

' 執行並隱藏
WshShell.Run chr(34) & batPath & chr(34), 0
