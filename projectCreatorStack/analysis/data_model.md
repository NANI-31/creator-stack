# Data Models (MongoDB)

## User Schema

```typescript
{
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['guest', 'user', 'author', 'admin'], default: 'user' },
  avatar: String,
  bio: String,
  submissions: [{ type: Schema.Types.ObjectId, ref: 'Tool' }],
  likes: [{ type: Schema.Types.ObjectId, ref: 'Tool' }]
}
```

## Tool/Website Schema

```typescript
{
  name: { type: String, required: true },
  url: { type: String, required: true },
  shortDescription: String,
  detailedDescription: String,
  categories: [String],
  tags: [String],
  thumbnail: String,
  submittedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  averageRating: { type: Number, default: 0 },
  totalRatings: { type: Number, default: 0 }
}
```

## Comment Schema (Reddit-style)

```typescript
{
  toolId: { type: Schema.Types.ObjectId, ref: 'Tool' },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  content: { type: String, required: true },
  parentId: { type: Schema.Types.ObjectId, ref: 'Comment', default: null }, // For nesting
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  isEdited: { type: Boolean, default: false }
}
```
