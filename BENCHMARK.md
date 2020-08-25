|                                                  | Duration | Acc size |
| :----------------------------------------------- | :------: | :------: |
| ts-ws-all -> serverless-plugin-ncc               |   10.5s  |  52.2 kB |
| ts-ws-all -> serverless-plugin-tree-shake        |   4.6s   |  50.7 kB |
| ts-ws-all -> default serverless                  |   33.2s  |  23.6 MB |
| ts-ws-individual -> serverless-plugin-ncc        |   10.6s  |   52 kB  |
| ts-ws-individual -> serverless-plugin-tree-shake |   4.9s   |  66.1 kB |
| ts-ws-individual -> default serverless           |   44.5s  |  216 MB  |
| ws-all -> serverless-plugin-ncc                  |   5.7s   |  43.3 kB |
| ws-all -> serverless-plugin-tree-shake           |   4.3s   |  45.4 kB |
| ws-all -> default serverless                     |   26.2s  |  88.9 MB |
| ws-individual -> serverless-plugin-ncc           |   5.4s   |  43.3 kB |
| ws-individual -> serverless-plugin-tree-shake    |   4.3s   |  89.7 kB |
| ws-individual -> default serverless              |   38.3s  |  178 MB  |