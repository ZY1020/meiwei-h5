param(
  [string]$DesignRoot = 'C:\Users\25310\Desktop\小程序界面',
  [string]$OutputRoot = (Join-Path $PSScriptRoot '..\assets\brand')
)

Add-Type -AssemblyName System.Drawing

$OutputRoot = [System.IO.Path]::GetFullPath($OutputRoot)
[System.IO.Directory]::CreateDirectory($OutputRoot) | Out-Null
[System.IO.Directory]::CreateDirectory((Join-Path $OutputRoot 'dishes')) | Out-Null
[System.IO.Directory]::CreateDirectory((Join-Path $OutputRoot 'story')) | Out-Null

function Save-JpegCrop {
  param(
    [string]$Source,
    [string]$Destination,
    [int]$X,
    [int]$Y,
    [int]$Width,
    [int]$Height,
    [int]$TargetWidth = 1200
  )

  $image = [System.Drawing.Image]::FromFile($Source)
  try {
    $cropWidth = [Math]::Min($Width, $image.Width - $X)
    $cropHeight = [Math]::Min($Height, $image.Height - $Y)
    $targetHeight = [int]([Math]::Round($cropHeight * $TargetWidth / $cropWidth))
    $bitmap = New-Object System.Drawing.Bitmap($TargetWidth, $targetHeight)
    try {
      $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
      try {
        $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        $sourceRect = New-Object System.Drawing.Rectangle($X, $Y, $cropWidth, $cropHeight)
        $targetRect = New-Object System.Drawing.Rectangle(0, 0, $TargetWidth, $targetHeight)
        $graphics.DrawImage($image, $targetRect, $sourceRect, [System.Drawing.GraphicsUnit]::Pixel)
      } finally {
        $graphics.Dispose()
      }
      $bitmap.Save($Destination, [System.Drawing.Imaging.ImageFormat]::Jpeg)
    } finally {
      $bitmap.Dispose()
    }
  } finally {
    $image.Dispose()
  }
}

$splash = Join-Path $DesignRoot '1加载页\加载页_画板 1.jpg'
Save-JpegCrop $splash (Join-Path $OutputRoot 'splash.jpg') 0 0 4688 10150 900

$homeSource = Join-Path $DesignRoot '2首页\原图\首页_画板 1 副本.jpg'
Save-JpegCrop $homeSource (Join-Path $OutputRoot 'home-hero.jpg') 170 1520 4340 2580 1600

$story = Join-Path $DesignRoot '2首页\原图\蓝印故事\完整长图.jpg'
Save-JpegCrop $story (Join-Path $OutputRoot 'story\full.jpg') 0 0 4688 32325 1172
Save-JpegCrop $story (Join-Path $OutputRoot 'story\hero.jpg') 170 660 4340 4240 1400
Save-JpegCrop $story (Join-Path $OutputRoot 'story\craft.jpg') 170 9630 4340 5370 1400
Save-JpegCrop $story (Join-Path $OutputRoot 'story\table.jpg') 170 22450 4340 3740 1400
Save-JpegCrop $story (Join-Path $OutputRoot 'story\arrival.jpg') 170 28100 4340 3200 1400

$patternSources = @(
  @('pattern-2.jpg', '交互切换2.jpg'),
  @('pattern-3.jpg', '交互切换3.jpg'),
  @('pattern-4.jpg', '交互切换4-16.jpg')
)

foreach ($patternSource in $patternSources) {
  $sourcePath = Join-Path $DesignRoot ('2首页\原图\蓝印故事\' + $patternSource[1])
  $destinationPath = Join-Path $OutputRoot ('story\' + $patternSource[0])
  Save-JpegCrop $sourcePath $destinationPath 0 0 4688 3788 1172
}

$menu = Join-Path $DesignRoot '3菜单页\菜单\完整菜单长图.jpg'
$dishCrops = @(
  @('pork-belly', 3093, 1017), @('wuchang-fish', 4197, 1017), @('eel', 5293, 1019), @('crown-daisy', 6405, 1017),
  @('spicy-beef', 8059, 1019), @('grass-carp', 9163, 1019), @('ribs', 10261, 1017), @('chicken', 11371, 1019), @('pumpkin-veg', 12483, 1019),
  @('pearl-balls', 14143, 1017), @('panlong', 15245, 1019), @('bamboo-tiger', 16343, 1019),
  @('tea-chicken', 18001, 1013), @('lemon-shrimp', 19105, 1017), @('mushroom-ribs', 20221, 999),
  @('lotus-soup', 21893, 985), @('lotus-root', 22963, 1019), @('artemisia-bacon', 24061, 1015),
  @('rice-wine', 25717, 1019), @('plum-tea', 26821, 1019), @('rice', 28481, 1017), @('claypot-rice', 29583, 1019)
)

foreach ($dish in $dishCrops) {
  $destination = Join-Path $OutputRoot ('dishes\' + $dish[0] + '.jpg')
  # Use the exact image bounds from the source long image. The previous
  # accumulated offsets captured pieces of the next card and section headings.
  Save-JpegCrop $menu $destination 1290 $dish[1] 1540 $dish[2] 900
}

Write-Output ('Extracted design assets to ' + $OutputRoot)
