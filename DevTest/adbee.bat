cd C:\Users\A2\AppData\Local\Android\Sdk\platform-tools
adb kill-server
adb start-server
adb reverse tcp:8081 tcp:8081