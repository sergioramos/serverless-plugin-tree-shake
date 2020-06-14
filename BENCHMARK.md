|                                                  | Duration | Acc size |
| :----------------------------------------------- | :------: | :------: |
| ts-ws-all -> serverless-plugin-ncc               |   11.1s  |  52.2 kB |
| ts-ws-all -> serverless-plugin-tree-shake        |   5.2s   |  49.6 kB |
| ts-ws-all -> default serverless                  |   34.1s  |  21.5 MB |
| ts-ws-individual -> serverless-plugin-ncc        |   11.5s  |   52 kB  |
| ts-ws-individual -> serverless-plugin-tree-shake |   5.4s   |  64.9 kB |
| ts-ws-individual -> default serverless           |   41.9s  |  210 MB  |
| ws-all -> serverless-plugin-ncc                  |   6.3s   |  43.3 kB |
| ws-all -> serverless-plugin-tree-shake           |   4.9s   |  43.2 kB |
| ws-all -> default serverless                     |   27.2s  |  85.8 MB |
| ws-individual -> serverless-plugin-ncc           |   6.1s   |  43.3 kB |
| ws-individual -> serverless-plugin-tree-shake    |    5s    |   86 kB  |
| ws-individual -> default serverless              |   39.2s  |  172 MB  |