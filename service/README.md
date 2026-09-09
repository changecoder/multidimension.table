# Table Service

基于 Spring Boot 3 + PostgreSQL 的 REST API 后端服务。

## 技术栈

- Java 21
- Spring Boot 3.4
- Spring Web / Spring Data JPA
- PostgreSQL
- Maven

## 项目结构

```
src/main/java/com/multidimension/table/
├── MultidimensionTableApplication.java   # 启动类
├── common/                               # 通用组件（响应封装、异常处理、基础实体）
├── health/                               # 健康检查
└── workspace/                            # 工作空间 CRUD 示例模块
```

## 前置条件

- JDK 21+
- Maven 3.9+
- PostgreSQL（可使用根目录 README 中的 Docker 命令启动）

```bash
docker run --name pg \
  -e POSTGRES_PASSWORD=123456 \
  -e POSTGRES_USER=changecoder \
  -e POSTGRES_DB=changecoder \
  -p 5432:5432 \
  -v pgdata:/var/lib/postgresql/data \
  -d postgres:latest
```

## 配置

默认使用 `dev` profile，数据库连接可通过环境变量覆盖：

| 变量 | 默认值 |
|------|--------|
| `DB_HOST` | `localhost` |
| `DB_PORT` | `5432` |
| `DB_NAME` | `changecoder` |
| `DB_USER` | `changecoder` |
| `DB_PASSWORD` | `123456` |
| `SERVER_PORT` | `8080` |

## 运行

```bash
cd service
mvn spring-boot:run
```

服务启动后 API 前缀为 `/api`。

## API 示例

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/health` | 健康检查 |
| GET | `/api/workspaces` | 获取工作空间列表 |
| GET | `/api/workspaces/{id}` | 获取单个工作空间 |
| POST | `/api/workspaces` | 创建工作空间 |
| PUT | `/api/workspaces/{id}` | 更新工作空间 |
| DELETE | `/api/workspaces/{id}` | 删除工作空间 |

响应格式：

```json
{
  "code": 0,
  "message": "success",
  "data": {}
}
```

## 测试

```bash
mvn test
```
