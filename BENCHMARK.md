|                                                  | Duration | Acc size |
| :----------------------------------------------- | :------: | :------: |
| ts-ws-all -> serverless-plugin-ncc               |   11.2s  |  52.2 kB |
| ts-ws-all -> serverless-plugin-tree-shake        |   5.4s   |  50.7 kB |
| ts-ws-all -> default serverless                  |   39.3s  |  25.7 MB |
| ts-ws-individual -> serverless-plugin-ncc        |   11.3s  |   52 kB  |
| ts-ws-individual -> serverless-plugin-tree-shake |   5.4s   |  66.1 kB |
| ts-ws-individual -> default serverless           |   50.9s  |  223 MB  |
| ws-all -> serverless-plugin-ncc                  |   6.2s   |  43.3 kB |
| ws-all -> serverless-plugin-tree-shake           |   5.3s   |  45.4 kB |
| ws-all -> default serverless                     |   32.5s  |  92.5 MB |
| ws-individual -> serverless-plugin-ncc           |   6.2s   |  43.3 kB |
| ws-individual -> serverless-plugin-tree-shake    |   5.4s   |  89.7 kB |
| ws-individual -> default serverless              |   48.5s  |  185 MB  |