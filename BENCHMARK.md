|                                                  | Duration | Acc size |
| :----------------------------------------------- | :------: | :------: |
| ts-ws-all -> serverless-plugin-ncc               |   11.2s  |  52.2 kB |
| ts-ws-all -> serverless-plugin-tree-shake        |   4.8s   |  50.7 kB |
| ts-ws-all -> default serverless                  |    36s   |  23.6 MB |
| ts-ws-individual -> serverless-plugin-ncc        |    11s   |   52 kB  |
| ts-ws-individual -> serverless-plugin-tree-shake |   5.1s   |  66.1 kB |
| ts-ws-individual -> default serverless           |   45.6s  |  216 MB  |
| ws-all -> serverless-plugin-ncc                  |    6s    |  43.3 kB |
| ws-all -> serverless-plugin-tree-shake           |    5s    |  45.4 kB |
| ws-all -> default serverless                     |   28.9s  |  88.9 MB |
| ws-individual -> serverless-plugin-ncc           |   6.3s   |  43.3 kB |
| ws-individual -> serverless-plugin-tree-shake    |    5s    |  89.7 kB |
| ws-individual -> default serverless              |   42.9s  |  178 MB  |