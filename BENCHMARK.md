|                                                  | Duration | Acc size |
| :----------------------------------------------- | :------: | :------: |
| ts-ws-all -> serverless-plugin-ncc               |   9.7s   |  52.2 kB |
| ts-ws-all -> serverless-plugin-tree-shake        |   4.1s   |  49.6 kB |
| ts-ws-all -> default serverless                  |    28s   |  21.5 MB |
| ts-ws-individual -> serverless-plugin-ncc        |   9.4s   |   52 kB  |
| ts-ws-individual -> serverless-plugin-tree-shake |   4.2s   |  64.9 kB |
| ts-ws-individual -> default serverless           |   35.1s  |  210 MB  |
| ws-all -> serverless-plugin-ncc                  |   5.2s   |  43.3 kB |
| ws-all -> serverless-plugin-tree-shake           |   4.1s   |  43.2 kB |
| ws-all -> default serverless                     |    22s   |  85.8 MB |
| ws-individual -> serverless-plugin-ncc           |   5.3s   |  43.3 kB |
| ws-individual -> serverless-plugin-tree-shake    |   4.1s   |   86 kB  |
| ws-individual -> default serverless              |   33.1s  |  172 MB  |