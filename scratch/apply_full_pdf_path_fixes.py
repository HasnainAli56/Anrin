import os

files_to_modify = [
    'stainless-team.html',
    'stainless steel new/stainless-team.html',
    'files (1)/stainless-team.html',
    'files (1)/stainless steel new/stainless-team.html',
    'files (2) (1)/stainless-team.html',
    'files (2) (1)/stainless steel new/stainless-team.html'
]

old_helper = """function getRealPdfUrl(href) {
  if (!href) return '';
  if (href.startsWith('pdfs/')) {
    return IMG + href.substring(5);
  }
  return href;
}"""

new_helper = """function getRealPdfUrl(href) {
  if (!href) return '';
  if (href.startsWith('pdfs/')) {
    const file = href.substring(5);
    const lower = file.toLowerCase();
    if (lower.includes('betonggolv') || lower.includes('massagolv') || lower.includes('klinkergolv') || lower.includes('plastmatta')) {
      return "https://stainlessteam.se/wp-content/uploads/2024/02/" + file;
    }
    if (lower.includes('svanhals')) {
      return "https://stainlessteam.se/wp-content/uploads/2025/02/" + file;
    }
    return IMG + file;
  }
  return href;
}"""

for f_path in files_to_modify:
    if not os.path.exists(f_path):
        print(f"Skipping {f_path} (does not exist)")
        continue
        
    with open(f_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    if old_helper in content:
        content = content.replace(old_helper, new_helper)
        with open(f_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Successfully updated helper in {f_path}")
    else:
        # try normalize line endings
        content_norm = content.replace('\r\n', '\n')
        old_helper_norm = old_helper.replace('\r\n', '\n')
        new_helper_norm = new_helper.replace('\r\n', '\n')
        if old_helper_norm in content_norm:
            content_norm = content_norm.replace(old_helper_norm, new_helper_norm)
            with open(f_path, 'w', encoding='utf-8') as f:
                f.write(content_norm)
            print(f"Successfully updated helper in {f_path} (normalized)")
        else:
            print(f"ERROR: Helper function not found in {f_path}")
