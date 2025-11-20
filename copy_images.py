#!/usr/bin/env python3
"""
Script para copiar imagens do projeto Next.js para o projeto Twig
"""
import os
import shutil
from pathlib import Path

# Caminhos
SOURCE_DIR = Path('/home/daniel/Documentos/fachada-mc-lp/public')
TARGET_DIR = Path('/home/daniel/Documentos/FachadasMC/public/assets')

# Arquivos e diretórios para copiar
IMAGES_TO_COPY = {
    'servicos/LOGO_MC_INVERSO.svg': 'images/logo.svg',
    'servicos/clientes.jpg': 'images/clientes.jpg',
    'servicos/5b85aa4404c9490caa0d7307cbb886aa.jpg': 'images/about.jpg',
    'servicos/hidrojateamento_breezes.jpg': 'images/servicos/hidrojateamento_breezes.jpg',
    'servicos/polimento.jpg': 'images/servicos/polimento.jpg',
    'servicos/vidro_vedacao.jpg': 'images/servicos/vidro_vedacao.jpg',
    'servicos/limpeza_pele_de_vidros.jpg': 'images/servicos/limpeza_pele_de_vidros.jpg',
    'servicos/hidrojateamento.jpg': 'images/servicos/hidrojateamento.jpg',
    'servicos/limpeza_vidros.jpg': 'images/servicos/limpeza_vidros.jpg',
    'servicos/Limpeza-de-fachada-em-Joinville.jpg': 'images/hero-bg.jpg',
}

# Diretórios para copiar
DIRS_TO_COPY = {
    'galeria': 'images/galeria',
    'servicos/ancoragem': 'images/servicos/ancoragem',
}

def copy_file(source_path, target_path):
    """Copia um arquivo criando os diretórios necessários"""
    target_path.parent.mkdir(parents=True, exist_ok=True)
    if source_path.exists():
        shutil.copy2(source_path, target_path)
        print(f"✓ Copiado: {source_path.name} -> {target_path}")
        return True
    else:
        print(f"✗ Não encontrado: {source_path}")
        return False

def copy_directory(source_dir, target_dir):
    """Copia um diretório inteiro"""
    if source_dir.exists() and source_dir.is_dir():
        target_dir.mkdir(parents=True, exist_ok=True)
        for item in source_dir.iterdir():
            if item.is_file():
                target_file = target_dir / item.name
                shutil.copy2(item, target_file)
                print(f"✓ Copiado: {item.name} -> {target_dir}")
        return True
    else:
        print(f"✗ Diretório não encontrado: {source_dir}")
        return False

def main():
    print("Iniciando cópia de imagens...\n")
    
    # Copiar arquivos individuais
    print("Copiando arquivos individuais...")
    for source, target in IMAGES_TO_COPY.items():
        source_path = SOURCE_DIR / source
        target_path = TARGET_DIR / target
        copy_file(source_path, target_path)
    
    print("\nCopiando diretórios...")
    # Copiar diretórios
    for source, target in DIRS_TO_COPY.items():
        source_dir = SOURCE_DIR / source
        target_dir = TARGET_DIR / target
        copy_directory(source_dir, target_dir)
    
    print("\n✓ Cópia concluída!")

if __name__ == '__main__':
    main()

