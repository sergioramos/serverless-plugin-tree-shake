|                                                  | Duration | Acc size |
| :----------------------------------------------- | :------: | :------: |
| ts-ws-all -> serverless-plugin-ncc               |   10.8s  |  52.2 kB |
| ts-ws-all -> serverless-plugin-tree-shake        |   5.2s   |  50.7 kB |
| ts-ws-all -> default serverless                  |   37.5s  |  26.7 MB |
| ts-ws-individual -> serverless-plugin-ncc        |   10.7s  |   52 kB  |
| ts-ws-individual -> serverless-plugin-tree-shake |   4.9s   |  66.1 kB |
| ts-ws-individual -> default serverless           |   51.7s  |  226 MB  |
| ws-all -> serverless-plugin-ncc                  |   6.8s   |  43.3 kB |
| ws-all -> serverless-plugin-tree-shake           |   5.1s   |  45.4 kB |
| ws-all -> default serverless                     |   31.2s  |  93.9 MB |
| ws-individual -> serverless-plugin-ncc           |    6s    |  43.3 kB |
| ws-individual -> serverless-plugin-tree-shake    |    5s    |  89.7 kB |
| ws-individual -> default serverless              |   50.4s  |  188 MB  |