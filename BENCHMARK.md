|                                                  | Duration | Acc size |
| :----------------------------------------------- | :------: | :------: |
| ts-ws-all -> serverless-plugin-ncc               |    11s   |  52.2 kB |
| ts-ws-all -> serverless-plugin-tree-shake        |   5.3s   |  50.7 kB |
| ts-ws-all -> default serverless                  |   37.7s  |  25.7 MB |
| ts-ws-individual -> serverless-plugin-ncc        |   10.9s  |   52 kB  |
| ts-ws-individual -> serverless-plugin-tree-shake |   5.3s   |  66.1 kB |
| ts-ws-individual -> default serverless           |   51.8s  |  223 MB  |
| ws-all -> serverless-plugin-ncc                  |    6s    |  43.3 kB |
| ws-all -> serverless-plugin-tree-shake           |   5.2s   |  45.4 kB |
| ws-all -> default serverless                     |    32s   |  92.5 MB |
| ws-individual -> serverless-plugin-ncc           |   6.1s   |  43.3 kB |
| ws-individual -> serverless-plugin-tree-shake    |   5.4s   |  89.7 kB |
| ws-individual -> default serverless              |   49.6s  |  185 MB  |