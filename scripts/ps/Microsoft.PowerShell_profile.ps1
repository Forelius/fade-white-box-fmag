# Auto-detect and load project-specific PowerShell profiles

function Test-ProjectDirectory {
    param([string]$ProjectPath)
    
    # Check if current location is within the project directory
    $currentPath = Get-Location
    return $currentPath.Path -like "*$ProjectPath*"
}

function Test-ProjectFromCommand {
    param([string]$ProjectPath)
    
    # Check if the command line contains a reference to the project directory
    $commandLine = [Environment]::CommandLine
    return $commandLine -like "*$ProjectPath*"
}

function Load-ProjectProfile {
    param([string]$ProjectPath, [string]$ProjectName, [string]$ProfileScript)
    
    # Check both current directory and command line for project detection
    $isInProject = (Test-ProjectDirectory -ProjectPath $ProjectPath) -or (Test-ProjectFromCommand -ProjectPath $ProjectPath)
    
    if ($isInProject) {
        $profilePath = Join-Path $ProjectPath $ProfileScript
        if (Test-Path $profilePath) {
            Write-Host "Loading $ProjectName profile..." -ForegroundColor Green
            
            # Change to project directory before loading profile
            Push-Location $ProjectPath
            try {
                # Call the project profile with the project name
                & $profilePath -ProjectName $ProjectName
            }
            finally {
                Pop-Location
            }
            return $true
        }
        else {
            Write-Warning "Project profile not found at: $profilePath"
        }
    }
    return $false
}

# Auto-load project profiles when in their directories
$fadePrivatePackPath = "d:\dev\github\fade-private-pack"
$fadeCompendiumsPath = "d:\dev\github\fade-compendiums"
$fadeMystara = "d:\dev\github\fade-mystara"
$fadeWhiteBoxFmag = "d:\dev\github\fade-white-box-fmag"
$fadeProfileScript = "scripts\ps\PowerShell_Profile.ps1"

$profileLoaded = Load-ProjectProfile -ProjectPath $fadePrivatePackPath -ProjectName "fade-private-pack" -ProfileScript $fadeProfileScript
$profileLoaded = $profileLoaded -or (Load-ProjectProfile -ProjectPath $fadeCompendiumsPath -ProjectName "fade-compendiums" -ProfileScript $fadeProfileScript)
$profileLoaded = $profileLoaded -or (Load-ProjectProfile -ProjectPath $fadeMystara -ProjectName "fade-mystara" -ProfileScript $fadeProfileScript)
$profileLoaded = $profileLoaded -or (Load-ProjectProfile -ProjectPath $fadeWhiteBoxFmag -ProjectName "fade-white-box-fmag" -ProfileScript $fadeProfileScript)

# Add more projects here as needed:
# $profileLoaded = $profileLoaded -or (Load-ProjectProfile -ProjectPath "d:\dev\github\another-project" -ProjectName "another-project" -ProfileScript "scripts\ps\PowerShell_Profile.ps1")

if (-not $profileLoaded) {
    # Default behavior when not in a project directory
    Write-Host "PowerShell Profile Loaded" -ForegroundColor Cyan
    # Add any global PowerShell customizations here
}