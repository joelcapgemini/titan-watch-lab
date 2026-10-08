"""Rebuild every lab PDF. Run from the repo root: python lab/tools/build_all.py"""
import subprocess
import sys
from pathlib import Path

root = Path(__file__).resolve().parents[2]
builder = root / "lab" / "tools" / "build_lab_pdf.py"

subprocess.run([sys.executable, str(builder), str(root), "instructions", str(root / "lab" / "kaiju-lab-instructions.pdf")], check=True)
for folder in sorted((root / "lab" / "scenarios").iterdir()):
    if (folder / "scenario.md").exists():
        out = folder / f"{folder.name}-scenario-pack.pdf"
        subprocess.run([sys.executable, str(builder), str(root), "scenario", str(out), str(folder)], check=True)
