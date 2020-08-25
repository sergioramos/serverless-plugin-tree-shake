|                                                  | Duration | Acc size |
| :----------------------------------------------- | :------: | :------: |
| ts-ws-all -> serverless-plugin-ncc               |   10.6s  |  52.2 kB |
| ts-ws-all -> serverless-plugin-tree-shake        |   5.1s   |  50.7 kB |
| ts-ws-all -> default serverless                  |   36.5s  |  25.7 MB |
| ts-ws-individual -> serverless-plugin-ncc        |   10.6s  |   52 kB  |
| ts-ws-individual -> serverless-plugin-tree-shake |   5.1s   |  66.1 kB |
| ts-ws-individual -> default serverless           |   49.6s  |  223 MB  |
| ws-all -> serverless-plugin-ncc                  |   5.9s   |  43.3 kB |
| ws-all -> serverless-plugin-tree-shake           |    5s    |  45.4 kB |
| ws-all -> default serverless                     |    30s   |  92.5 MB |
| ws-individual -> serverless-plugin-ncc           |   5.9s   |  43.3 kB |
| ws-individual -> serverless-plugin-tree-shake    |   4.9s   |  89.7 kB |
| ws-individual -> default serverless              |   46.5s  |  185 MB  |