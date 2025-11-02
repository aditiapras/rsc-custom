# Multi Step Form - Migration Guide

Panduan untuk migrasi dari versi lama ke versi terbaru komponen Multi Step Form.

## Table of Contents

- [Version History](#version-history)
- [Breaking Changes](#breaking-changes)
- [Migration Steps](#migration-steps)
- [Feature Updates](#feature-updates)
- [Deprecated Features](#deprecated-features)
- [Upgrade Checklist](#upgrade-checklist)

## Version History

### v1.1.0 (Current)
- ✅ Added password field type support
- ✅ Fixed checkbox array validation
- ✅ Improved validation system
- ✅ Better default value handling
- ✅ Comprehensive documentation
- 🐛 Fixed required field validation
- 🐛 Fixed checkbox array rendering
- 🐛 Fixed default value initialization

### v1.0.0 (Initial)
- Basic multi-step form functionality
- Support for text, email, number, textarea, select, radio, checkbox, switch, date, file
- Basic validation system
- Grid layout support

## Breaking Changes

### v1.0.0 → v1.1.0

#### 1. Checkbox Behavior Changes

**Before (v1.0.0)**:
```tsx
// All checkboxes were treated as single boolean values
{
  label: "Interests",
  type: "checkbox",
  options: [
    { label: "Tech", value: "tech" },
    { label: "Design", value: "design" }
  ]
}
// Result: boolean (true/false) - INCORRECT
```

**After (v1.1.0)**:
```tsx
// Checkboxes with options are now arrays
{
  label: "Interests", 
  type: "checkbox",
  options: [
    { label: "Tech", value: "tech" },
    { label: "Design", value: "design" }
  ]
}
// Result: string[] (["tech", "design"]) - CORRECT

// Single checkboxes (no options) remain boolean
{
  label: "Accept Terms",
  type: "checkbox"
  // No options = single checkbox
}
// Result: boolean (true/false) - CORRECT
```

**Migration Required**: ✅ **Yes** - Update form handlers expecting checkbox values

#### 2. Default Values for Checkbox Arrays

**Before (v1.0.0)**:
```tsx
// Checkbox arrays defaulted to false
initialValues: {
  interests: false  // INCORRECT for array checkboxes
}
```

**After (v1.1.0)**:
```tsx
// Checkbox arrays default to empty array
initialValues: {
  interests: []  // CORRECT for array checkboxes
}
```

**Migration Required**: ✅ **Yes** - Update initial values

#### 3. Validation Schema Changes

**Before (v1.0.0)**:
```tsx
// Checkbox validation was inconsistent
// Required checkboxes validated as boolean
```

**After (v1.1.0)**:
```tsx
// Checkbox arrays validate minimum selection
// Single checkboxes validate as boolean
// More consistent validation behavior
```

**Migration Required**: ⚠️ **Potentially** - Check validation behavior

## Migration Steps

### Step 1: Update Checkbox Handlers

If you have checkbox fields with options, update your submit handlers:

```tsx
// ❌ Old handler (v1.0.0)
const handleSubmit = (values) => {
  if (values.interests) {  // Treated as boolean
    console.log("User has interests")
  }
}

// ✅ New handler (v1.1.0)
const handleSubmit = (values) => {
  if (values.interests && values.interests.length > 0) {  // Treated as array
    console.log("User interests:", values.interests)
  }
}
```

### Step 2: Update Initial Values

```tsx
// ❌ Old initial values (v1.0.0)
const initialValues = {
  name: "John Doe",
  interests: false,  // Wrong for checkbox array
  newsletter: true   // OK for single checkbox
}

// ✅ New initial values (v1.1.0)
const initialValues = {
  name: "John Doe", 
  interests: ["tech"],  // Correct for checkbox array
  newsletter: true      // Still OK for single checkbox
}
```

### Step 3: Update Type Definitions (TypeScript)

```tsx
// ❌ Old types (v1.0.0)
interface FormData {
  name: string
  interests: boolean  // Wrong for checkbox array
  newsletter: boolean
}

// ✅ New types (v1.1.0)
interface FormData {
  name: string
  interests: string[]  // Correct for checkbox array
  newsletter: boolean  // Still correct for single checkbox
}
```

### Step 4: Update Validation Logic

```tsx
// ❌ Old validation (v1.0.0)
const validateForm = (values) => {
  if (!values.interests) {
    return "Please select interests"
  }
}

// ✅ New validation (v1.1.0)
const validateForm = (values) => {
  if (!values.interests || values.interests.length === 0) {
    return "Please select at least one interest"
  }
}
```

## Feature Updates

### New Password Field Type

**Added in v1.1.0**:

```tsx
// ✅ Now supported
{
  label: "Password",
  type: "password",  // New field type
  required: true,
  validation: {
    minLength: 8
  }
}
```

**Migration**: No breaking changes, just add to your config if needed.

### Enhanced Validation

**Improved in v1.1.0**:

```tsx
// ✅ Better validation support
{
  label: "Username",
  type: "text",
  validation: {
    minLength: 3,      // More consistent
    maxLength: 20,     // Better error messages
    pattern: "^[a-zA-Z0-9_]+$"  // Regex support
  },
  error_message: "Custom error message"  // Better customization
}
```

### Better Error Handling

**Enhanced in v1.1.0**:

- More descriptive error messages
- Better field-specific validation
- Improved required field handling
- Consistent validation across field types

## Deprecated Features

### None Currently

All features from v1.0.0 are still supported in v1.1.0, with improvements and bug fixes.

## Upgrade Checklist

### Pre-Migration Checklist

- [ ] **Backup your code** before starting migration
- [ ] **Test current functionality** to establish baseline
- [ ] **Identify checkbox fields** with options in your forms
- [ ] **Review submit handlers** that process checkbox values
- [ ] **Check initial values** for checkbox fields

### Migration Checklist

#### 1. Code Changes

- [ ] **Update checkbox handlers** to expect arrays instead of booleans
- [ ] **Update initial values** for checkbox arrays
- [ ] **Update TypeScript types** if using TypeScript
- [ ] **Update validation logic** for checkbox arrays
- [ ] **Add password field type** if needed

#### 2. Testing

- [ ] **Test single checkboxes** (should still work as boolean)
- [ ] **Test checkbox arrays** (should now work as string arrays)
- [ ] **Test form submission** with various field combinations
- [ ] **Test validation** for required checkbox arrays
- [ ] **Test initial values** loading correctly

#### 3. Validation

- [ ] **Verify required checkbox arrays** require at least one selection
- [ ] **Verify single checkboxes** work as before
- [ ] **Test password field** validation and masking
- [ ] **Check error messages** display correctly

### Post-Migration Checklist

- [ ] **All tests passing**
- [ ] **Form submission working correctly**
- [ ] **Validation behaving as expected**
- [ ] **No console errors**
- [ ] **User experience unchanged** (except for improvements)

## Common Migration Issues

### Issue 1: Checkbox Values Not Working

**Problem**: Checkbox values are undefined or wrong type.

**Solution**:
```tsx
// Check if you have options defined
{
  label: "Interests",
  type: "checkbox",
  options: [  // ← Make sure this exists for array behavior
    { label: "Tech", value: "tech" }
  ]
}

// Update handler accordingly
const handleSubmit = (values) => {
  // For checkbox with options (array)
  if (Array.isArray(values.interests)) {
    console.log("Selected interests:", values.interests)
  }
  
  // For single checkbox (boolean)
  if (typeof values.newsletter === 'boolean') {
    console.log("Newsletter subscription:", values.newsletter)
  }
}
```

### Issue 2: TypeScript Errors

**Problem**: TypeScript complaining about checkbox types.

**Solution**:
```tsx
// Use union types for flexibility
interface FormData {
  interests: string[]  // For checkbox arrays
  newsletter: boolean  // For single checkboxes
}

// Or use conditional types
type CheckboxValue<T> = T extends { options: any[] } ? string[] : boolean
```

### Issue 3: Validation Not Working

**Problem**: Required checkbox arrays not validating properly.

**Solution**:
```tsx
// Make sure required is set and options exist
{
  label: "Required Interests",
  type: "checkbox",
  required: true,  // ← This is important
  options: [       // ← This makes it an array
    { label: "Option 1", value: "opt1" }
  ]
}
```

## Automated Migration Script

For large codebases, you can use this script to help identify areas that need updates:

```bash
#!/bin/bash
# migration-helper.sh

echo "Searching for potential checkbox migration issues..."

# Find checkbox configurations with options
grep -r "type.*checkbox" --include="*.tsx" --include="*.ts" . | grep -i "options"

echo "Found checkbox fields with options (need array handling)"

# Find potential handlers that might need updating
grep -r "values\." --include="*.tsx" --include="*.ts" . | grep -E "(interests|hobbies|skills|categories)"

echo "Found potential checkbox value usage (review for array handling)"
```

## Version Compatibility

| Feature | v1.0.0 | v1.1.0 | Notes |
|---------|--------|--------|-------|
| Basic form fields | ✅ | ✅ | No changes |
| Single checkboxes | ✅ | ✅ | No changes |
| Checkbox arrays | ❌ | ✅ | New behavior |
| Password fields | ❌ | ✅ | New feature |
| Enhanced validation | ⚠️ | ✅ | Improved |
| Better error messages | ⚠️ | ✅ | Improved |

## Getting Help with Migration

If you encounter issues during migration:

1. **Check the troubleshooting guide** for common solutions
2. **Review the API reference** for current behavior
3. **Test with minimal examples** to isolate issues
4. **Check console for errors** and validation messages

### Migration Support

For complex migrations or if you need assistance:

- Review the **examples** folder for updated usage patterns
- Check the **API reference** for detailed behavior descriptions
- Use the **troubleshooting guide** for common issues

Remember: The migration primarily affects checkbox arrays. Most other functionality remains the same with improvements!