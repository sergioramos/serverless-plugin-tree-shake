|                                                  | Duration | Acc size |
| :----------------------------------------------- | :------: | :------: |
| ts-ws-all -> serverless-plugin-ncc               |   10.6s  |  52.2 kB |
| ts-ws-all -> serverless-plugin-tree-shake        |   5.2s   |  50.7 kB |
| ts-ws-all -> default serverless                  |    37s   |  26.7 MB |
| ts-ws-individual -> serverless-plugin-ncc        |   10.6s  |   52 kB  |
| ts-ws-individual -> serverless-plugin-tree-shake |   5.2s   |  66.1 kB |
| ts-ws-individual -> default serverless           |   48.2s  |  226 MB  |
| ws-all -> serverless-plugin-ncc                  |   5.9s   |  43.3 kB |
| ws-all -> serverless-plugin-tree-shake           |   4.8s   |  45.4 kB |
| ws-all -> default serverless                     |   30.8s  |  93.9 MB |
| ws-individual -> serverless-plugin-ncc           |   6.3s   |  43.3 kB |
| ws-individual -> serverless-plugin-tree-shake    |   5.2s   |  89.7 kB |
| ws-individual -> default serverless              |   47.8s  |  188 MB  |