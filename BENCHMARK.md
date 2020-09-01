|                                                  | Duration | Acc size |
| :----------------------------------------------- | :------: | :------: |
| ts-ws-all -> serverless-plugin-ncc               |   12.6s  |  52.2 kB |
| ts-ws-all -> serverless-plugin-tree-shake        |   5.9s   |  50.7 kB |
| ts-ws-all -> default serverless                  |   41.2s  |   26 MB  |
| ts-ws-individual -> serverless-plugin-ncc        |   11.1s  |   52 kB  |
| ts-ws-individual -> serverless-plugin-tree-shake |   5.5s   |  66.1 kB |
| ts-ws-individual -> default serverless           |   51.6s  |  225 MB  |
| ws-all -> serverless-plugin-ncc                  |   6.5s   |  43.3 kB |
| ws-all -> serverless-plugin-tree-shake           |   5.6s   |  45.4 kB |
| ws-all -> default serverless                     |   32.6s  |  93.2 MB |
| ws-individual -> serverless-plugin-ncc           |   6.3s   |  43.3 kB |
| ws-individual -> serverless-plugin-tree-shake    |   5.3s   |  89.7 kB |
| ws-individual -> default serverless              |   49.7s  |  186 MB  |