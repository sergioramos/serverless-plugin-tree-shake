|                                                  | Duration | Acc size |
| :----------------------------------------------- | :------: | :------: |
| ts-ws-all -> serverless-plugin-ncc               |   11.5s  |  52.2 kB |
| ts-ws-all -> serverless-plugin-tree-shake        |   5.2s   |  49.6 kB |
| ts-ws-all -> default serverless                  |   33.6s  |  21.5 MB |
| ts-ws-individual -> serverless-plugin-ncc        |   11.3s  |   52 kB  |
| ts-ws-individual -> serverless-plugin-tree-shake |    5s    |  64.9 kB |
| ts-ws-individual -> default serverless           |   40.6s  |  210 MB  |
| ws-all -> serverless-plugin-ncc                  |   5.9s   |  43.3 kB |
| ws-all -> serverless-plugin-tree-shake           |   4.9s   |  43.2 kB |
| ws-all -> default serverless                     |   26.2s  |  85.8 MB |
| ws-individual -> serverless-plugin-ncc           |   5.8s   |  43.3 kB |
| ws-individual -> serverless-plugin-tree-shake    |   5.1s   |   86 kB  |
| ws-individual -> default serverless              |   38.5s  |  172 MB  |