|                                                  | Duration | Acc size |
| :----------------------------------------------- | :------: | :------: |
| ts-ws-all -> serverless-plugin-ncc               |   10.4s  |  52.2 kB |
| ts-ws-all -> serverless-plugin-tree-shake        |   4.8s   |  50.7 kB |
| ts-ws-all -> default serverless                  |   37.2s  |  26.8 MB |
| ts-ws-individual -> serverless-plugin-ncc        |   10.3s  |   52 kB  |
| ts-ws-individual -> serverless-plugin-tree-shake |    5s    |  66.1 kB |
| ts-ws-individual -> default serverless           |   48.5s  |  226 MB  |
| ws-all -> serverless-plugin-ncc                  |   5.7s   |  43.3 kB |
| ws-all -> serverless-plugin-tree-shake           |    5s    |  45.4 kB |
| ws-all -> default serverless                     |   29.7s  |  93.9 MB |
| ws-individual -> serverless-plugin-ncc           |   5.7s   |  43.3 kB |
| ws-individual -> serverless-plugin-tree-shake    |    5s    |  89.7 kB |
| ws-individual -> default serverless              |   46.5s  |  188 MB  |