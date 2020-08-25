|                                                  | Duration | Acc size |
| :----------------------------------------------- | :------: | :------: |
| ts-ws-all -> serverless-plugin-ncc               |   10.4s  |  52.2 kB |
| ts-ws-all -> serverless-plugin-tree-shake        |   4.8s   |  50.7 kB |
| ts-ws-all -> default serverless                  |   32.5s  |  23.6 MB |
| ts-ws-individual -> serverless-plugin-ncc        |   10.4s  |   52 kB  |
| ts-ws-individual -> serverless-plugin-tree-shake |   4.8s   |  66.1 kB |
| ts-ws-individual -> default serverless           |   42.5s  |  216 MB  |
| ws-all -> serverless-plugin-ncc                  |   5.5s   |  43.3 kB |
| ws-all -> serverless-plugin-tree-shake           |   4.4s   |  45.4 kB |
| ws-all -> default serverless                     |   24.5s  |  88.9 MB |
| ws-individual -> serverless-plugin-ncc           |   5.9s   |  43.3 kB |
| ws-individual -> serverless-plugin-tree-shake    |   4.3s   |  89.7 kB |
| ws-individual -> default serverless              |   39.7s  |  178 MB  |