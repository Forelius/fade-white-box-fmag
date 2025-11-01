# PowerShell script to remove lightPerception entries and basicSight entries with null/zero range from JSON files
# Updated version to handle both CRLF and LF line endings

$actorsPath = "d:\dev\github\fade-compendiums\packsrc\actors"
$filesProcessed = 0
$lightPerceptionRemoved = 0
$basicSightRemoved = 0

Write-Host "Starting lightPerception and basicSight cleanup process (handling both CRLF and LF line endings)..."
Write-Host "Searching in: $actorsPath"

# Get all JSON files recursively
$jsonFiles = Get-ChildItem -Path $actorsPath -Filter "*.json" -Recurse

Write-Host "Found $($jsonFiles.Count) JSON files to process"

foreach ($file in $jsonFiles) {
    try {
        # Read file content as raw bytes to preserve line endings
        $content = [System.IO.File]::ReadAllText($file.FullName)
        $originalContent = $content
        
        # Pattern to match complete lightPerception entries
        # This pattern handles both CRLF (\r\n) and LF (\n) line endings
        # Matches the entire lightPerception object including surrounding whitespace and commas
        $lightPerceptionPattern = '\{\s*"id":\s*"lightPerception"[^}]*\}'
        
        # Pattern to match basicSight entries with null or zero range
        $basicSightPattern = '\{\s*"id":\s*"basicSight"[^}]*"range":\s*(null|0)[^}]*\}'
        
        $hasLightPerception = $content -match $lightPerceptionPattern
        $hasBasicSight = $content -match $basicSightPattern
        
        if ($hasLightPerception -or $hasBasicSight) {
            Write-Host "Processing: $($file.Name)"
            $updatedContent = $content
            
            # Remove lightPerception entries if found
            if ($hasLightPerception) {
                # Remove entire lightPerception entries with smart comma handling
                # First, try to match lightPerception with trailing comma (not last item)
                $updatedContent = $updatedContent -replace '\{\s*"id":\s*"lightPerception"[^}]*\}\s*,', ''
                
                # Then, try to match lightPerception without trailing comma but with leading comma (last item)
                $updatedContent = $updatedContent -replace ',\s*\{\s*"id":\s*"lightPerception"[^}]*\}', ''
                
                # Finally, handle case where it's the only item (no commas)
                $updatedContent = $updatedContent -replace '\{\s*"id":\s*"lightPerception"[^}]*\}', ''
                
                # Count lightPerception removals
                $lightPerceptionMatches = [regex]::Matches($content, $lightPerceptionPattern)
                $lightPerceptionRemoved += $lightPerceptionMatches.Count
                Write-Host "  Removed $($lightPerceptionMatches.Count) lightPerception entry(ies)"
            }
            
            # Remove basicSight entries with null or zero range if found
            if ($hasBasicSight) {
                # Remove entire basicSight entries with null/zero range using smart comma handling
                # First, try to match basicSight with trailing comma (not last item)
                $updatedContent = $updatedContent -replace '\{\s*"id":\s*"basicSight"[^}]*"range":\s*(null|0)[^}]*\}\s*,', ''
                
                # Then, try to match basicSight without trailing comma but with leading comma (last item)
                $updatedContent = $updatedContent -replace ',\s*\{\s*"id":\s*"basicSight"[^}]*"range":\s*(null|0)[^}]*\}', ''
                
                # Finally, handle case where it's the only item (no commas)
                $updatedContent = $updatedContent -replace '\{\s*"id":\s*"basicSight"[^}]*"range":\s*(null|0)[^}]*\}', ''
                
                # Count basicSight removals
                $basicSightMatches = [regex]::Matches($content, $basicSightPattern)
                $basicSightRemoved += $basicSightMatches.Count
                Write-Host "  Removed $($basicSightMatches.Count) basicSight entry(ies) with null/zero range"
            }
            
            # Clean up any orphaned commas after opening brackets
            $updatedContent = $updatedContent -replace '\[\s*,', '['
            
            # Clean up any trailing commas before closing brackets
            $updatedContent = $updatedContent -replace ',(\s*\])', '$1'
            
            if ($updatedContent -ne $originalContent) {
                # Write the updated content back to the file, preserving original encoding
                [System.IO.File]::WriteAllText($file.FullName, $updatedContent, [System.Text.UTF8Encoding]::new($false))
                $filesProcessed++
            }
        }
    }
    catch {
        Write-Warning "Error processing file $($file.FullName): $($_.Exception.Message)"
    }
}

Write-Host ""
Write-Host "Cleanup completed!"
Write-Host "Files processed: $filesProcessed"
Write-Host "Total lightPerception entries removed: $lightPerceptionRemoved"
Write-Host "Total basicSight entries removed (null/zero range): $basicSightRemoved"