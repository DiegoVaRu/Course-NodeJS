const fs = require('node:fs/promises');
const path = require('node:path');
const pico = require('picocolors')

const folder = process.argv[2] ?? '.'

async function ls(folder){
    let files;

    try{
        files = await fs.readdir(folder);
    } catch {
        console.error(`No se pudo leer el directorio ${folder}.`)
        process.exit(1)
    }

    const filePromises = files.map(async file => {
        const filePath = path.join(folder, file)
        let stats

        try {
            stats = await fs.stat(filePath) //devuelve información del archivo
        } catch {
            console.error(pico.red(`No se pudo leer el archivo ${filePath}`))
            process.exit(1)
        }

        const fileType = stats.isDirectory() ? 'd-- ' : 'a-- '
        let fileSize = stats.size
        const fileMod = stats.mtime.toLocaleString()

        if(fileType === 'd-- ') { 
            let actualSize = 0;
            const innerFiles = await fs.readdir(filePath); 
            for (const innerFile of innerFiles) {
                const innerFilePath = path.join(filePath, innerFile); 
                try {
                    const innerStats = await fs.stat(innerFilePath); 
                    actualSize += innerStats.size;
                } catch {
                    console.error(`No se pudo leer ${innerStats}`)
                }
            } 
                
            fileSize = `~ ${actualSize}`;
        }

        return `${fileType} ${pico.blueBright(file.padEnd(20))} ${pico.yellow(fileMod.padStart(30))}  ${pico.green(fileSize?.toString().padStart(10))} b  ${pico.gray(filePath.padStart(20))}`
    })

    const filesInfo = await Promise.all(filePromises)

    filesInfo.forEach(fileInfo => console.log(fileInfo));
}

ls(folder)
