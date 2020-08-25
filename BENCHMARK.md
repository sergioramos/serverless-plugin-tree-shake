|                                                  | Duration | Acc size |
| :----------------------------------------------- | :------: | :------: |
| ts-ws-all -> serverless-plugin-ncc               |   9.2s   |  52.2 kB |
| ts-ws-all -> serverless-plugin-tree-shake        |   4.3s   |  50.7 kB |
| ts-ws-all -> default serverless                  |   30.2s  |  25.7 MB |
| ts-ws-individual -> serverless-plugin-ncc        |   9.1s   |   52 kB  |
| ts-ws-individual -> serverless-plugin-tree-shake |   4.4s   |  66.1 kB |
| ts-ws-individual -> default serverless           |   40.7s  |  223 MB  |
| ws-all -> serverless-plugin-ncc                  |    5s    |  43.3 kB |
| ws-all -> serverless-plugin-tree-shake           |   4.1s   |  45.4 kB |
| ws-all -> default serverless                     |   25.6s  |  92.5 MB |
| ws-individual -> serverless-plugin-ncc           |   5.1s   |  43.3 kB |
| ws-individual -> serverless-plugin-tree-shake    |   4.3s   |  89.7 kB |
| ws-individual -> default serverless              |   38.9s  |  185 MB  |