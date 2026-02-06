#!/usr/bin/env php
<?php

declare(strict_types=1);














$stdin = fopen('php://stdin', 'r');
stream_set_blocking($stdin, false);


usleep(10000); 
$input = '';
while (($chunk = fread($stdin, 8192)) !== false && $chunk !== '') {
$input .= $chunk;
}
fclose($stdin);

$status = $input ? json_decode($input, true) : [];


$sessionId = $status['session_id'] ?? null;


$model = 'Unknown';
if (isset($status['model'])) {
if (is_array($status['model'])) {
$model = $status['model']['display_name'] ?? $status['model']['id'] ?? 'Unknown';
} else {
$model = $status['model'];
}
}


$contextPercent = 0;
if (isset($status['context_window'])) {
if (is_array($status['context_window'])) {
$contextPercent = (int) round($status['context_window']['used_percentage'] ?? 0);
} else {

$contextWindow = (int) $status['context_window'];
$contextUsed = (int) ($status['context_used'] ?? 0);
$contextPercent = $contextWindow > 0 ? (int) round(($contextUsed / $contextWindow) * 100) : 0;
}
}


$gitBranch = getCurrentBranch();


$lockFile = findActiveLock($sessionId);
$taskInfo = '';

if ($lockFile && file_exists($lockFile)) {
$lockContent = file_get_contents($lockFile);
if ($lockContent !== false) {
$lockData = json_decode($lockContent, true);
if (isset($lockData['currentTask'])) {
$taskId = $lockData['currentTask']['id'] ?? '?';
$taskTitle = $lockData['currentTask']['title'] ?? 'Untitled';

if (strlen($taskTitle) > 40) {
$taskTitle = substr($taskTitle, 0, 37).'...';
}
$taskInfo = "#{$taskId}: {$taskTitle} | ";
}
}
}


$modelShort = formatModelName($model);


$statusLine = '';

if ($gitBranch) {
$statusLine .= "\033[35m[{$gitBranch}]\033[0m "; 
}

if ($taskInfo) {
$statusLine .= "\033[36m{$taskInfo}\033[0m"; 
}

$statusLine .= "\033[33m[{$modelShort}]\033[0m "; 


$contextColor = getContextColor($contextPercent);
$statusLine .= "{$contextColor}{$contextPercent}%\033[0m";

echo $statusLine;




function getCurrentBranch(): ?string
{
$result = exec('git rev-parse --abbrev-ref HEAD 2>/dev/null', $output, $returnCode);

return $returnCode === 0 && $result ? trim($result) : null;
}




function findActiveLock(?string $sessionId): ?string
{
$cwd = getcwd();
if ($cwd === false) {
return null;
}

$specsDir = $cwd.'/.laracode/specs';
if (! is_dir($specsDir)) {
return null;
}

$dirs = glob($specsDir.'/*', GLOB_ONLYDIR);
if (! $dirs) {
return null;
}


if ($sessionId !== null) {
foreach ($dirs as $dir) {
$lockPath = $dir.'/index.lock';
if (file_exists($lockPath)) {
$content = file_get_contents($lockPath);
if ($content !== false) {
$data = json_decode($content, true);
if (isset($data['session_id']) && $data['session_id'] === $sessionId) {
return $lockPath;
}
}
}
}
}


foreach ($dirs as $dir) {
$lockPath = $dir.'/index.lock';
if (file_exists($lockPath)) {
return $lockPath;
}
}

return null;
}




function formatModelName(string $model): string
{
$model = strtolower($model);

if (str_contains($model, 'opus')) {
return 'Opus';
}
if (str_contains($model, 'sonnet')) {
return 'Sonnet';
}
if (str_contains($model, 'haiku')) {
return 'Haiku';
}


$parts = explode('-', $model);

return ucfirst($parts[0]);
}




function getContextColor(int $percent): string
{
if ($percent >= 80) {
return "\033[31m"; 
}
if ($percent >= 60) {
return "\033[33m"; 
}

return "\033[32m"; 
}
